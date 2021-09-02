import { Coordinates, Direction, Grid, GridSize, MarsRover, Obstacle } from '../main/mars-rover'

const basicGrid = new Grid(new GridSize(10, 10), [])

type TestCase = {
  command: string
  position: string
  marsRoverParams: ConstructorParameters<typeof MarsRover>
}

const basicMarsRoverTest = ({
  command,
  position,
  marsRoverParams,
}: TestCase) => {
  const rover = new MarsRover(...marsRoverParams)

  rover.executeCommand(command)

  expect(rover.getPosition()).toBe(position)
}

describe('Mars rover', () => {
  it('should only allow R L or M command', () => {
    const rover = new MarsRover(
      new Coordinates(0, 0),
      Direction.NORTH,
      basicGrid,
    )

    expect(() => rover.executeCommand('C')).toThrowError()
  })

  describe('normal movements', () => {
    const TEST_CASES: TestCase[] = [
      {
        command: 'RM',
        position: '1:0:E',
        marsRoverParams: [new Coordinates(0, 0), Direction.NORTH, basicGrid],
      },
      {
        command: 'RMM',
        position: '2:0:E',
        marsRoverParams: [new Coordinates(0, 0), Direction.NORTH, basicGrid],
      },
      {
        command: 'LM',
        position: '8:9:W',
        marsRoverParams: [new Coordinates(9, 9), Direction.NORTH, basicGrid],
      },
      {
        command: 'LMM',
        position: '7:9:W',
        marsRoverParams: [new Coordinates(9, 9), Direction.NORTH, basicGrid],
      },
      {
        command: 'LMM',
        position: '9:7:S',
        marsRoverParams: [new Coordinates(9, 9), Direction.WEST, basicGrid],
      },
      {
        command: 'MLRM',
        position: '0:2:N',
        marsRoverParams: [new Coordinates(0, 0), Direction.NORTH, basicGrid],
      },
    ]

    it.each(TEST_CASES)(
      'moves to $position when it receives the command "$command"',
      basicMarsRoverTest,
    )
  })

  describe('grid boundaries', () => {
    const TEST_CASES: TestCase[] = [
      {
        command: 'M',
        position: '9:0:W',
        marsRoverParams: [
          new Coordinates(0, 0),
          Direction.WEST,
          basicGrid,
        ],
      },
      {
        command: 'M',
        position: '0:9:S',
        marsRoverParams: [
          new Coordinates(0, 0),
          Direction.SOUTH,
          basicGrid,
        ],
      },
      {
        command: 'M',
        position: '0:9:E',
        marsRoverParams: [
          new Coordinates(9, 9),
          Direction.EAST,
          basicGrid,
        ],
      },
      {
        command: 'M',
        position: '9:0:N',
        marsRoverParams: [
          new Coordinates(9, 9),
          Direction.NORTH,
          basicGrid,
        ],
      },
    ]

    it.each(TEST_CASES)(
      'moves to $position when it receives the command "$command"',
      basicMarsRoverTest,
    )
  })

  describe('obstacles', () => {
    const TEST_CASES: TestCase[] = [
      {
        command: 'MMRMMLM',
        position: '2:3:N',
        marsRoverParams: [
          new Coordinates(0, 0),
          Direction.NORTH,
          basicGrid,
        ],
      },
      {
        command: 'MMMMMMMMMM',
        position: '0:0:N',
        marsRoverParams: [
          new Coordinates(0, 0),
          Direction.NORTH,
          basicGrid,
        ],
      },
      {
        command: 'MMMM',
        position: 'O:0:2:N',
        marsRoverParams: [
          new Coordinates(0, 0),
          Direction.NORTH,
          new Grid(new GridSize(10, 10), [new Obstacle(0,3)]),
        ],
      },
      {
        command: 'M',
        position: 'O:0:0:W',
        marsRoverParams: [
          new Coordinates(0, 0),
          Direction.WEST,
          new Grid(new GridSize(10, 10), [new Obstacle(9, 0)]),
        ],
      },
    ]

    it.each(TEST_CASES)(
      'moves to $position when it receives the command "$command"',
      basicMarsRoverTest,
    )
  })
})
