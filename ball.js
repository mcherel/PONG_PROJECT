class Ball {

    constructor() {

        this.x = width / 2
        this.y = height / 2

        this.Xspeed = 0
        this.Yspeed = 0
        this.Xfactor = 7
        this.Yfactor = 5
        this.r = 12
        this.delta = 1.5
        this.Reset()
    }


    Update() {

        this.x += this.Xspeed // Displacement per time unit
        this.y += this.Yspeed
    }


    Show() {

        fill(255)
        ellipse(this.x, this.y, this.r * 2)
    }


    Reset() {

        const angle = random(-PI / 4, PI / 4)

        this.x = width / 2
        this.y = height / 2

        this.Xspeed = this.Xfactor * cos(angle)
        this.Yspeed = this.Xfactor * sin(angle)

        // Randomized direction at each serve
        if (random(1) < 0.5) {
            this.Xspeed *= -1
        }
    }


    HitCeilFloor() {

        if (this.y < 0 || this.y > height) { // touching either Ceil or Floor

            this.Yspeed *= -1 // vector Y mirrors Y-axis while X maintains

            /*
            if (this.y > height) console.log('floor xD')
            if (this.y < 0) console.log('ceil :D')
            */
        }

        if (this.x - this.r > width) { // L wins once |---Dist---> -gt. WindowW 

            LeftScore++
            this.Reset()
        }

        if (this.x + this.r < 0) { // R wins once |---Dist---> -lt. 0

            RightScore++
            this.Reset()
        }
    }


    DoesItHitThePaddleLeft(p) {

        if (
            this.y - this.r < p.y + p.h / 2 && // hits lower half of p(addle)
            this.y + this.r > p.y - p.h / 2 && // hits upper half of p
            this.x - this.r < p.x + p.w / 2 // checking : <--|--o
        ) {
            if (this.x <= p.x)
                return
            let diff = this.y - (p.y - p.h / 2)
            let rad = radians(60)
            let angle = map(diff, 0, p.h, -rad, rad)
            this.Xspeed = this.Xfactor * cos(angle)
            this.Yspeed = this.Xfactor * sin(angle)
            // this.Xspeed *= -1
            this.x = this.r + p.x + p.w / 2
        }
    }


    DoesItHitThePaddleRight (p) {

        if (
            this.y - this.r < p.y + p.h / 2 && // hits lower half of p(addle)
            this.y + this.r > p.y - p.h / 2 && // hits upper half of p(addle)
            this.x + this.r > p.x - p.w / 2 // checking : o--|-->
        ) {

            if (this.x >= p.x)
                return
            let diff = this.y - (p.y - p.h / 2) // (?) always positive
            let rad = radians(60)
            let angle = map(diff, 0, p.h, -rad, rad)
            this.Xspeed = this.Xfactor * cos(angle)
            this.Yspeed = this.Xfactor * sin(angle)

            this.Xspeed *= -1

            this.x = p.x - p.w / 2 - this.r // optional: make sure ball not stuck inside paddle


            /*
            ----------------------------
            |
            |           ||      |
            |           ||      |
            |           ||      |
            |           ||      | p.h / 2
            |           p.y     |
            |           ||
            o this.y    ||
            |           ||
            |           ||
            |
            |
            */
        }
    }


}
