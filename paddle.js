class Paddle {

    constructor(isLeft/*:boolean*/) {

        this.isleft = isLeft

        this.w = 21
        this.h = 112

        this.x = isLeft ? this.w : width - this.w
        this.y = height / 2

        this.deltaY = 0
        this.offset = this.h / 2 - random() * 3
    }


    Update() {

        this.y += this.deltaY
        this.y = constrain(
            this.y, 
            this.h - this.offset , 
            height - this.h + this.offset
        )
    }


    MoveVertically(SPEED) {

        this.deltaY = SPEED
    }


    Show() {

        fill(this.isleft
            ? 'rgba(0, 255, 0, 0.25)'
            : 'rgba(100%, 0%, 100%, 0.5)')

        rectMode(CENTER)
        rect(this.x, this.y, this.w, this.h)
    }
}

