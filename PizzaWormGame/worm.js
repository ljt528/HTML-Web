class Worm {
    constructor() {
        this.wormBody = [new Tile(13, 10), new Tile(13, 11), new Tile(13, 12)];
        // 지렁이의 현재 방향
        this.dir = 'ArrowUp';
        // 지렁이의 다음 방향
        this.dirNext = 'ArrowUp';
    }

    renderWorm() {
        this.wormBody.forEach((item) => {
            item.renderTile();
        })
    }

    // 충돌 체크
    collisionCheck(wormHead) {
        // 게임 테두리 boolean
        const leftEdge = (wormHead.col === 0);
        const topEdge = (wormHead.row === 0);

        // 타일 위치 기준점 왼쪽 상단
        const rightEdge = (wormHead.col === tileWidth - 1); 
        const bottomEdge = (wormHead.row === tileHeight - 1);

        // 게임 테두리에 충돌했는지 체크
        const collisionEdge = leftEdge || topEdge || rightEdge || bottomEdge;

        // 자기 몸에 충돌했는지 체크
        let collisionBody;
        this.wormBody.forEach((item) => {
            if (wormHead.collisionCheck(item)) {
                collisionBody = true;
            }
        })

        return collisionEdge || collisionBody;
    }

    // 이동
    moveWorm() {
        // 지렁이의 현재 머리
        const head = this.wormBody[0];

        //  이동에 다른 새로운 머리
        let newHead;

        // 다음 방향으로 지렁이를 컨트롤 합니다.
        this.dir = this.dirNext;

        // 이동 방향에 따른 벌래의 머리 랜더링 위치 설정. 기존 머리가 있던 위치에서 위, 아래, 왼쪽, 오른쪽으로 새로운 머리 생성
        if (this.dir === "ArrowRight") {
            newHead = new Tile(head.col + 1, head.row);
        } else if (this.dir === "ArrowDown") {
            newHead = new Tile(head.col, head.row + 1);
        } else if (this.dir === "ArrowLeft") {
            newHead = new Tile(head.col - 1, head.row);
        } else if (this.dir === "ArrowUp") {
            newHead = new Tile(head.col, head.row - 1);
        }


        // 머리와 몸통이 충돌 시 GameOver
        if (this.collisionCheck(newHead)) {
            renderGameOver();
        }

        // 머리에 새로운 머리를 추가
        this.wormBody.unshift(newHead);

        // 머리와 피자가 충돌하면 1.점수가 올라감 / 2. 피자가 새로운 위치로 이동
        if (newHead.collisionCheck(pizza.pos)) {
            ctxBg.clearRect(0, 0, cWidth, cHeight);
            score++;
            pizza.movePizza();
        } else {
            this.wormBody.pop();
        }
    }

    // 사용자가 입력한 방향에 따라 지렁이의 방향을 결정합니다.
    checkDirection(dirKey) {
        console.log(dirKey);

        // 진행 방향의 역방향으로 키보드 입력 불가
        if (this.dir === "ArrowRight" && dirKey === "ArrowLeft") {
            return;
        } else if (this.dir === "ArrowDown" && dirKey === "ArrowUp") {
            return;
        } else if (this.dir === "ArrowLeft" && dirKey === "ArrowRight") {
            return;
        } else if (this.dir === "ArrowUp" && dirKey === "ArrowDown") {
            return;
        }

        this.dirNext = dirKey;
    }
}