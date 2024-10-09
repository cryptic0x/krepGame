import { assets } from './game.js'
import { GameObject } from './gameObject.js'
import { Vector2 } from './math.js'
import { input } from './input.js'
import { time } from './time.js'

export class Bird extends GameObject {
  jumpForce = -2.2

  velocity = new Vector2(0, 0)

  collider = {
    width: 30,
    height: 36,
    offset: new Vector2(10, 3),
  }

  dead = false

  update() {
    if (input.getKeyPressed('KeyF') || (input.getMouseButtonClick(0) && !this.dead)) {
      this.velocity.y = this.jumpForce
      assets.get('wing').play()
    }

    const gravity = 4

    this.velocity.y = this.velocity.y + gravity * time.deltaTime
    this.position.addPosition(this.velocity.x, this.velocity.y)

    if (this.dead) {
      this.sprite = assets.get('bird-hurt')
    } else {
      this.sprite = this.velocity.y < 0 ? assets.get('bird-flap') : assets.get('bird')
    }
  }

  // Axis-aligned bounding box testing (AABB collision test)
  collides(pipe) {
    return (
      pipe.position.x < this.position.x + this.collider.offset.x + this.collider.width &&
      pipe.position.x + pipe.sprite.width > this.position.x + this.collider.offset.x &&
      pipe.position.y < this.position.y + this.collider.offset.y + this.collider.height &&
      pipe.sprite.height + pipe.position.y > this.position.y + this.collider.offset.y
    )
  }

  reset() {
    this.velocity = new Vector2(0, 0)
    this.dead = false
  }
}
