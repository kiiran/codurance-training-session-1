export class Coordinates {
  constructor(public readonly x: number, public readonly y: number) {}
}

export class Obstacle extends Coordinates {
}

export class GridSize {
  constructor(public readonly width: number, public readonly height: number) {}
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
  RIGHT = 'R',
  LEFT = 'L',
}

const directions = [
  Direction.NORTH,
  Direction.EAST,
  Direction.SOUTH,
  Direction.WEST,
]

export class MarsRover {
  private x: number
  private y: number
  private hasHitObstacle: boolean = false

  constructor(
    startingPosition: Coordinates,
    private direction: Direction,
    private grid: Grid,
  ) {
    this.x = startingPosition.x
    this.y = startingPosition.y
  }

  public getPosition = (): string => {
    return [this.hasHitObstacle && 'O', this.x, this.y, this.direction[0]]
      .filter((item) => item !== false)
      .join(':')
  }

  public executeCommand = (commands: string): void => {
    for (const command of commands.split('')) {
      if (this.hasHitObstacle) return

      switch (command) {
        case Command.RIGHT:
        case Command.LEFT:
          this.changeDirection(command)
          break

        case Command.MOVE:
          this.moveForward()
          break
        default:
          throw new Error('unexpected input command ' + command)
      }
    }
  }

  private moveForward = () => {
    const nextPosition = {
      x: this.x,
      y: this.y,
    }

    switch (this.direction) {
      case Direction.NORTH:
        nextPosition.y = this.y + 1
        break

      case Direction.EAST:
        nextPosition.x = this.x + 1
        break

      case Direction.SOUTH:
        nextPosition.y = this.y - 1
        break

      case Direction.WEST:
        nextPosition.x = this.x - 1
        break
    }

    try {
      const position = this.grid.getNextPosition(nextPosition)
      this.x = position.x
      this.y = position.y
    } catch (e) {
      this.hasHitObstacle = true
    }
  }

  private changeDirection = (command: Command.RIGHT | Command.LEFT) => {
    const offset = command === Command.RIGHT ? 1 : -1
    const currentIndex = directions.findIndex((d) => d === this.direction)
    this.direction = MarsRover.getNewDirection(currentIndex + offset)
  }

  private static getNewDirection(index: number) {
    const wrappedIndex = (index + directions.length) % directions.length

    return directions[wrappedIndex]
  }
}
