export default function ImageInfo({ $target, onExit }) {
  this.$modal = document.createElement('section');
  this.$modal.className = 'ImageInfo';
  $target.appendChild(this.$modal);

  this.setState = (newData) => {
    this.data = newData;
    this.render();
    // console.log('image info');
    // console.log(this.data);
  };

  this.render = () => {
    if (this.data.visible) {
      const { alt_description, id, urls, tags_preview } = this.data.image;

      this.$modal.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <div class="close">x</div>
          </div>
          <img src="${urls.small}" alt="${alt_description}" id=${id}/>
          <div class="description">
            <h3>${alt_description}</h3>
            <div>tags : ${tags_preview.map((tag) => `<span>${tag.title}</span>`)}</div>
          </div>
        </div>`;
      this.$modal.classList.add('fadein');
      this.$modal.style.display = 'block';
    } else {
      this.$modal.style.display = 'none';
    }

    this.fadeInOut = () => {
      // 뒤로가기가 클릭됐을 때, fadeout 추가, fadein이 있다면 삭제
      this.$modal.classList.add('fadeout');
      const effect = setInterval(() => {
        if (this.$modal.classList.contains('fadein')) {
          this.$modal.classList.remove('fadein');
        }
        // ImageInfo의 opacity(불투명도)가 0이 될 때까지 반복호출
        if (this.$modal.style.opacity == 0) {
          this.$modal.classList.remove('fadeout');
          clearInterval(effect);
          onExit();
        }
      }, 500);
    };

    this.$modal.addEventListener('click', (e) => {
      const $btn = e.target.closest('.close');
      const $imageInfo = e.target.closest('.ImageInfo');
      const $wrapper = e.target.closest('.content-wrapper');
      if ($wrapper && !$btn) return;

      this.fadeInOut();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.fadeInOut();
        // console.log('esc');
        onExit();
      }
    });
  };
}
