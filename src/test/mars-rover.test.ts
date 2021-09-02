import { Direction, MarsRover } from '../main/mars-rover'

describe('Mars rover', () => {
  it('should only allow R L or M command', () => {
    const rover = new MarsRover(0, 0, Direction.NORTH)

    expect(() => rover.executeCommand('C')).toThrowError()
  })

  describe('normal movements', () => {
    const TEST_CASES: {
      command: string
      position: string
      start: [number, number, Direction]
    }[] = [
      { command: 'RM', position: '1:0:E', start: [0, 0, Direction.NORTH] },
      { command: 'RMM', position: '2:0:E', start: [0, 0, Direction.NORTH] },
      { command: 'LM', position: '8:9:W', start: [9, 9, Direction.NORTH] },
      { command: 'LMM', position: '7:9:W', start: [9, 9, Direction.NORTH] },
      { command: 'LMM', position: '9:7:S', start: [9, 9, Direction.WEST] },
      { command: 'MLRM', position: '0:2:N', start: [0, 0, Direction.NORTH] },
    ]

    it.each(TEST_CASES)(
      'moves to $position when it receives the command "$command"',
      ({ command, position, start }) => {
        const rover = new MarsRover(...start)

        rover.executeCommand(command)

        expect(rover.getPosition()).toBe(position)
      },
    )
  })

  describe('grid boundaries', () => {

    const TEST_CASES: {
      command: string
      position: string
      start: [number, number, Direction]
    }[] = [
      { command: 'M', position: '9:0:W', start: [0, 0, Direction.WEST] },
      { command: 'M', position: '0:9:S', start: [0, 0, Direction.SOUTH] },
      { command: 'M', position: '0:9:E', start: [9, 9, Direction.EAST] },
      { command: 'M', position: '9:0:N', start: [9, 9, Direction.NORTH] },
    ]

    it.each(TEST_CASES)(
      'moves to $position when it receives the command "$command"',
      ({ command, position, start }) => {
        const rover = new MarsRover(...start)

        rover.executeCommand(command)

        expect(rover.getPosition()).toBe(position)
      },
    )
  })
})
