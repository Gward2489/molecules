let canvas = document.getElementById('water');
let canvasLeft = canvas.offsetLeft;
let canvasTop = canvas.offsetTop;
let ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let molecules = []

function Molecule(radii, velocity, xCoords, yCoords, colors) {
        this.radii = radii
        this.velocity = velocity
        this.yCoords = yCoords
        this.xCoords = xCoords
        this.colors = colors
        this.counter = 0

        let o1 = new Path2D();
        let o2 = new Path2D();
        let h = new Path2D();
    
        //draw the first oxygen atomolecule  
        o1.arc(this.xCoords.o1, this.yCoords.o1, this.radii.o1, 0, 2 * Math.PI)
        ctx.fillStyle = this.colors.o1
        ctx.fill(o1)
        //draw the hydrogen atomolecule
        h.arc(this.xCoords.h, this.yCoords.h, this.radii.h, 0, 2 * Math.PI)
        ctx.fillStyle = this.colors.h
        ctx.fill(h)
        //draw the second oxygen atomolecule
        o2.arc(this.xCoords.o2, this.yCoords.o2, this.radii.o2, 0, 2 * Math.PI)
        ctx.fillStyle = this.colors.o2
        ctx.fill(o2)
}


Molecule.prototype.update = function() {

    if (this.yCoords.o1 + this.velocity.o1.y > (canvas.height - 10) ||
        this.yCoords.o1 + this.velocity.o1.y < 10 || 
        this.yCoords.o2 + this.velocity.o2.y > (canvas.height - 10) ||
        this.yCoords.o2 + this.velocity.o2.y < 10 ||
        this.yCoords.h + this.velocity.h.y > (canvas.height - 10) ||
        this.yCoords.h + this.velocity.h.y < 10) {
            this.velocity.o1.y = -this.velocity.o1.y;
            this.velocity.o2.y = -this.velocity.o2.y;
            this.velocity.h.y = -this.velocity.h.y;      
            let currentSigno1 = Math.sign(this.velocity.o1.y)
            let currentSigno2 = Math.sign(this.velocity.o2.y)

            this.yCoords.o1 += (currentSigno1 * 24)
            this.yCoords.o2 += (currentSigno2 * 24)
        }
        
        if (
            this.xCoords.o1 + this.velocity.o1.x > (canvas.width - 10) ||
            this.xCoords.o1 + this.velocity.o1.x < 10 ||
            this.xCoords.o2 + this.velocity.o2.x > (canvas.width - 10) ||
            this.xCoords.o2 + this.velocity.o2.x < 10 ||
            this.xCoords.h + this.velocity.h.x > (canvas.width - 10) ||
            this.xCoords.h + this.velocity.h.x < 10) {
                this.velocity.o1.x = -this.velocity.o1.x;
                this.velocity.o2.x = -this.velocity.o2.x;
                this.velocity.h.x = -this.velocity.h.x;
                
                let numberCache = this.xCoords.o1
                this.xCoords.o1 = this.xCoords.o2
                this.xCoords.o2 = numberCache
        }

        //apply velocity
        this.xCoords.o1 += this.velocity.o1.x
        this.xCoords.o2 += this.velocity.o2.x
        this.xCoords.h += this.velocity.h.x
        this.yCoords.o1 += this.velocity.o1.y
        this.yCoords.o2 += this.velocity.o2.y
        this.yCoords.h += this.velocity.h.y

        let o1 = new Path2D();
        let o2 = new Path2D();
        let h = new Path2D();
    
        //draw the first oxygen atomolecule  
        o1.arc(this.xCoords.o1, this.yCoords.o1, this.radii.o1, 0, 2 * Math.PI)
        ctx.fillStyle = this.colors.o1
        ctx.fill(o1)
        //draw the hydrogen atomolecule
        h.arc(this.xCoords.h, this.yCoords.h, this.radii.h, 0, 2 * Math.PI)
        ctx.fillStyle = this.colors.h
        ctx.fill(h)
        //draw the second oxygen atomolecule
        o2.arc(this.xCoords.o2, this.yCoords.o2, this.radii.o2, 0, 2 * Math.PI)
        ctx.fillStyle = this.colors.o2
        ctx.fill(o2)
}

function drawMolecules() {
    for (let i = 0; i < 66; i++) {
        let randomX = Math.floor(Math.random() * ((canvas.width - 75) - 75 + 1)) + 75;
        let randomY = Math.floor(Math.random() * ((canvas.height - 75) - 75 + 1)) + 75;

        let randomXV = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        let randomYV =  Math.floor(Math.random() * (6 - 1 + 1)) + 1;

        let randomXD = Math.floor(Math.random() * (1 - -1 + 1)) + -1;
        let randomYD = Math.floor(Math.random() * (1 - -1 + 1)) + -1;

        let o1x = -15
        let o2x = 15

        let o1y = 12
        let o2y = 12

        if (Math.sign(randomXD) === -1) {
            o1x = 15
            o2x = -15
        }
        
        if (Math.sign(randomYD) === -1) {
            o1y = -12
            o2y = -12
        }

         let velocity = {
            o1: {
                x: randomXV * randomXD,
                y: randomYV * randomYD
            },
            o2: {
                x: randomXV * randomXD,
                y: randomYV * randomYD
            },
            h: {
                x: randomXV * randomXD,
                y: randomYV * randomYD
            }
        }
        let radii = {
            o1: 15.3,
            o2: 15.3,
            h: 21
        }
        let colors = {
            o1: "#e0e0eb",
            o2: "#e0e0eb",
            h: "#b30000"
        }
        let xCoords = {
            o1: randomX + o1x,
            o2: randomX + o2x,
            h: randomX
        }
        let yCoords = {
            o1: randomY + o1y,
            o2: randomY + o2y,
            h: randomY
        }
        let molecule = new Molecule(radii, velocity, xCoords, yCoords, colors)
        molecules.push(molecule)
    }
    draw()
} 

drawMolecules()

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0;i < molecules.length; i++) {
        let currentMolecule = molecules[i]
        currentMolecule.update();
    }
    requestAnimationFrame(draw)
}

canvas.addEventListener('click', function(e) {
    let clickX = e.pageX - canvasLeft
    let clickY = e.pageY - canvasTop

    
    molecules.forEach(m => {
        
        
        if (
            clickX > m.xCoords.o1 - (m.radii.o1 + 4) && clickX < m.xCoords.o1 + (m.radii.o1 + 4) &&
            clickY > m.yCoords.o1 - (m.radii.o1 + 4) && clickY < m.yCoords.o1 + (m.radii.o1 + 4) ||
            clickX > m.xCoords.o2 - (m.radii.o2 + 4) && clickX < m.xCoords.o2 + (m.radii.o2 + 4) &&
            clickY > m.yCoords.o2 - (m.radii.o2 + 4) && clickY < m.yCoords.o2 + (m.radii.o2 + 4) ||
            clickX > m.xCoords.h - (m.radii.h + 4) && clickX < m.xCoords.h + (m.radii.h + 4) &&
            clickY > m.yCoords.h - (m.radii.h + 4) && clickY < m.yCoords.h + (m.radii.h + 4)
            
            ) {

                let randomX = Math.floor(Math.random() * (6 - 3 + 1)) + 3;
                let randomY = Math.floor(Math.random() * (6 - 3 + 1)) + 3;
                let randomD = Math.floor(Math.random() * (1 - -1 + 1)) + -1;

                m.velocity.o1.x += randomX 
                m.velocity.o2.x += randomX 
                m.velocity.o1.y += randomY 
                m.velocity.o2.y += randomY 
                m.velocity.h.x += randomX
                m.velocity.h.y += randomY

                m.velocity.o1.x = m.velocity.o1.x * randomD
                m.velocity.o2.x = m.velocity.o2.x * randomD
                m.velocity.h.x = m.velocity.h.x * randomD
                     
        }  
    });
});