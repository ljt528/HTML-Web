class Tile {
    constructor(col, row) {
        this.col = col;
        this.row = row;
        this.posX = this.col * tileSize;
        this.posY = this.row * tileSize;
    }

    renderTile(bg = 'green') {
        ctx.fillStyle = bg;
        ctx.fillRect(this.posX, this.posY, tileSize, tileSize);
    }

    renderImg(bg = './pizza.png') {
        // img 요소를 만드는 생성자 함수입니다.
        const image = new Image(tileSize, tileSize);
        image.src = bg;
        image.addEventListener('load', () => {
            // drawImage : 이미지를 그립니다. 그려줄 이미지 요소, x축, y축 위치, 가로, 세로 사이즈를 전달합니다.
            ctxBg.drawImage(image, this.posX, this.posY, tileSize, tileSize);
        })
    }
    
    // 두 타일의 충돌을 체크합니다.
    collisionCheck(target) {
        // && 연산자는 첫번째 falsy 값을 가지는 피연산자 혹은 마지막 truthy 값을 가지는 피연산자를 반환합니다.
        return this.col === target.col && this.row === target.row;
    }
}