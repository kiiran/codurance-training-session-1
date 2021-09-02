export class Grid {
  constructor(private readonly x: number, private readonly y: number) {
  }

  getNextXPosition(moveX: number) {
    return (moveX + this.x) % this.x
  }

  getNextYPosition(moveY: number) {
    return (moveY + this.y) % this.y
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
  private grid = new Grid(10, 10)

  constructor(
    private x: number,
    private y: number,
    private direction: Direction,
  ) {
  }

  public getPosition = (): string => {
    return `${this.x}:${this.y}:${this.direction[0]}`
  }

  public executeCommand = (commands: string): void => {
    for (const command of commands.split('')) {
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
    switch (this.direction) {
      case Direction.NORTH:
        this.y = this.grid.getNextYPosition(this.y + 1)
        break

      case Direction.EAST:
        this.x = this.grid.getNextXPosition(this.x + 1)
        break

      case Direction.SOUTH:
        this.y = this.grid.getNextYPosition(this.y - 1)
        break

      case Direction.WEST:
        this.x = this.grid.getNextXPosition(this.x - 1)
        break
    }
  }

  private changeDirection = (command: Command.RIGHT | Command.LEFT) => {
    const offset = command === Command.RIGHT ? 1 : -1
    const currentIndex = directions.findIndex((d) => d === this.direction)
    this.direction = MarsRover.getNewDirection(currentIndex + offset)
  }

  private static getNewDirection(index: number){
    const wrappedIndex = (index + directions.length) % directions.length

    return directions[wrappedIndex]
  }
}
