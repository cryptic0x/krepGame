import { assets } from './game.js'
import { Pipe } from './pipe.js'
import { time } from './time.js'
import { randomBetween } from './math.js'

export class PipeManager {
  pipes = []

  moveSpeed = 60

  spawnTimer = 0

  score = false

  start() {
    this.createPipe()
  }

  update() {
    const timeBetweenSpawns = 2.5

    this.spawnTimer += time.deltaTime

    if (this.spawnTimer > timeBetweenSpawns) {
      this.createPipe()

      this.spawnTimer = 0
    }

    // update all pipe positions
    this.pipes.forEach((pipePair) => {
      pipePair.pipeTop.position.x -= this.moveSpeed * time.deltaTime
      pipePair.pipeBottom.position.x -= this.moveSpeed * time.deltaTime
    })
  }

  draw() {
    // draw all pipes
    this.pipes.forEach((pipePair) => {
      pipePair.pipeTop.draw()
      pipePair.pipeBottom.draw()
    })
  }

  createPipe() {
    const pipeTop = new Pipe(assets.get('pipe-top'))
    const pipeBottom = new Pipe(assets.get('pipe-bottom'))

    const verticalAreaBetweenPipes = randomBetween(100, 130)
    const verticalOpenAreaBetweenPipesPosition = randomBetween(120, 220)
    const horizontalPipePosition = randomBetween(300, 350)

    // calculate pipe positionen
    pipeTop.position.addPosition(horizontalPipePosition, verticalOpenAreaBetweenPipesPosition - pipeTop.sprite.height)
    pipeBottom.position.addPosition(
      horizontalPipePosition,
      verticalOpenAreaBetweenPipesPosition + verticalAreaBetweenPipes
    )

    this.pipes.push({
      pipeTop,
      pipeBottom,
    })
  }

  reset() {
    this.pipes = []
    this.spawnTimer = 0
  }
}
