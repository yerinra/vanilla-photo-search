export default function ImageInfo({ $target, data }) {
  this.$modal = document.createElement('section');
  this.$modal.className = 'ImageInfo';
  $target.appendChild(this.$modal);

  this.setState = (newData) => {
    this.data = newData;
    this.render();
  };

  this.render = () => {
    // console.log('hi');
    // console.log(this.data);
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
      this.$modal.style.display = 'block';
    } else {
      this.$modal.style.display = 'none';
    }

    this.$modal.addEventListener('click', (e) => {
      const $btn = e.target.closest('.close');
      const $imageInfo = e.target.closest('.ImageInfo');
      const $wrapper = e.target.closest('.content-wrapper');

      if ($wrapper && !$btn) return;
      if ($imageInfo) this.$modal.style.display = 'none';
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // this.$imageInfo.classList.add('fadeout');
        this.$modal.style.display = 'none';
      }
    });
  };
}
