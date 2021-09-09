export class Coordinates {
  constructor(public readonly x: number, public readonly y: number) {
  }
}

export class Obstacle extends Coordinates {
}

export class GridSize {
  constructor(public readonly width: number, public readonly height: number) {
  }
}

export class Grid {
  constructor(private gridSize: GridSize, private obstacles: Obstacle[]) {
  }

  getNextPosition({ x, y }: Coordinates): Coordinates {
    const nextPosition = new Coordinates(
      this.getNextXPosition(x),
      this.getNextYPosition(y),
    )

    // if there's an obstacle
    if (
      this.obstacles.some(
        (obstacle) =>
          obstacle.x === nextPosition.x && obstacle.y === nextPosition.y,
      )
    ) {
      throw new Error('uh oh, obstacle')
    }

    return nextPosition
  }

  private getNextXPosition(moveX: number) {
    return (moveX + this.gridSize.width) % this.gridSize.width
  }

  private getNextYPosition(moveY: number) {
    return (moveY + this.gridSize.height) % this.gridSize.height
  }
}

export enum Direction {
  NORTH = 'NORTH',
  SOUTH = 'SOUTH',
  EAST = 'EAST',
  WEST = 'WEST',
}

export enum Command {
  MOVE = 'M',
  UNDO = 'U',
  RIGHT = 'R',
  LEFT = 'L',
}

const directions = [
  Direction.NORTH,
  Direction.EAST,
  Direction.SOUTH,
  Direction.WEST,
]

export type MarsRoverState = {
  x: number
  y: number
  direction: Direction
  hasHitObstacle: boolean
}

export class CommandHistory<T> {
  private history: T[] = []

  public push(state: T) {
    this.history.push(state)
  }

  public pop(): T {
    if (this.history.length === 0) {
      throw new Error('No command in history')
    }
    return this.history.pop() as T
  }
}


export class StateMachine<T> {
  private currentState: T
  private commandHistory: CommandHistory<T>

  constructor(iniState: T) {
    this.currentState = iniState
    this.commandHistory = new CommandHistory<T>();
  }

  public setState(stateChange: Partial<T>) {
    this.commandHistory.push(this.currentState)
    this.currentState = { ...this.currentState, ...stateChange }
  }

  public getCurrentState(): T {
    return { ...this.currentState }
  }

  public revert() {
    this.currentState = this.commandHistory.pop()
  }
}

export class MarsRover {
  private stateMachine: StateMachine<MarsRoverState>;

  constructor(
    startingPosition: Coordinates,
    direction: Direction,
    private grid: Grid,
  ) {
    this.stateMachine = new StateMachine( {
      x: startingPosition.x,
      y: startingPosition.y,
      direction,
      hasHitObstacle: false,
    })
  }

  public getPosition = (): string => {
    const { x, y, direction, hasHitObstacle } = this.stateMachine.getCurrentState();
    return [hasHitObstacle && 'O', x, y, direction[0]]
      .filter((item) => item !== false)
      .join(':')
  }

  public executeCommand = (commands: string): void => {
    const { hasHitObstacle } = this.stateMachine.getCurrentState();
    for (const command of commands.split('')) {
      if (hasHitObstacle) return

      switch (command) {
        case Command.RIGHT:
        case Command.LEFT:
          this.changeDirection(command)
          break

        case Command.MOVE:
          this.moveForward()
          break

        case Command.UNDO:
          this.undoLastCommand()
          break
        default:
          throw new Error('unexpected input command ' + command)
      }
      console.log(`Command: ${command}. Position: ${this.getPosition()}`)
    }
  }

  private moveForward = () => {
    const { x, y, direction } = this.stateMachine.getCurrentState();
    const nextPosition = {
      x: x,
      y: y,
    }

    switch (direction) {
      case Direction.NORTH:
        nextPosition.y = y + 1
        break

      case Direction.EAST:
        nextPosition.x = x + 1
        break

      case Direction.SOUTH:
        nextPosition.y = y - 1
        break

      case Direction.WEST:
        nextPosition.x = x - 1
        break
    }

    try {
      const position = this.grid.getNextPosition(nextPosition)
      this.stateMachine.setState(position)
    } catch (e) {
      this.stateMachine.setState({ hasHitObstacle: true })
    }
  }

  private changeDirection = (command: Command.RIGHT | Command.LEFT) => {
    const { direction } = this.stateMachine.getCurrentState();
    const offset = command === Command.RIGHT ? 1 : -1
    const currentIndex = directions.findIndex((d) => d === direction)
    const newDirection = MarsRover.getNewDirection(currentIndex + offset)
    this.stateMachine.setState({ direction: newDirection })
  }

  private undoLastCommand() {
    this.stateMachine.revert();
  }

  private static getNewDirection(index: number) {
    const wrappedIndex = (index + directions.length) % directions.length

    return directions[wrappedIndex]
  }
}
