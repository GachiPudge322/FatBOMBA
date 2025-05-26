document.addEventListener('DOMContentLoaded', () => {
  let currentIndex = 0;

  if (document.querySelectorAll('.catalogueentry').length == 0) return;
  const entries = document.querySelectorAll('.catalogueentry');
  const preview = document.getElementById('cataloguepreviewimgid');
  const cname = document.getElementById('cname');
  const cdate = document.getElementById('cdate');

  let preview_path = entries[0].getAttribute('data-htmlpath');
  preview.src = "resources/tv_static.gif";
  preview.src = "resources/" + entries[0].getAttribute('data-preview');
  entries[0].classList.add('clicked');
  entries[0].src = "resources/" + entries[0].getAttribute('data-case_still');
  entries[0].className += ' entryselected';

  entries.forEach(entry => {
    entry.addEventListener('click', () => {
      let entry_name = entry.getAttribute('data-name');
      if (entry_name.length > 22) {
        entry_name = entry_name.slice(0, entry_name.length - 8) + "...";
      }
      cname.innerHTML = entry_name;

      cdate.innerHTML = entry.getAttribute('data-date');
      preview.src = "resources/" + entry.getAttribute('data-preview');
      preview.style.visibility = 'hidden';
      preview.onload = () => {
        preview.style.visibility = 'visible';
      };

      preview_path = entry.getAttribute('data-htmlpath');
      currentIndex = entry.getAttribute('data-index');

      entries.forEach(item => {
        if (item.getAttribute('data-index') != currentIndex) {
          item.className = "catalogueentry";
        }

        if (item.classList.contains('clicked')) {
          if (currentIndex == item.getAttribute('data-index')) {
            window.location.href = preview_path;
          }
        }

        item.classList.remove('clicked');
      });

      entry.className += ' entryselected';
      entry.classList.add('clicked');
    });
  });

  preview.addEventListener('click', () => {
    window.location.href = preview_path;
  });

  function openModal() {
    alert("Завантаження почнеться найближчим часом...");
  }

  window.addEventListener('load', () => {
    const gifBoxes = document.querySelectorAll('.gif-box');

    gifBoxes.forEach(box => {
      let isHovered = false;
      let isActive = false;

      const container = box.closest('.gif-container');

      const toggle = () => {
        if (!isHovered) {
          isActive = !isActive;
          box.classList.toggle('active', isActive);
          container.classList.toggle('active', isActive);
        }
      };

      const interval = setInterval(toggle, 2800);

      box.addEventListener('mouseenter', () => {
        isHovered = true;
        box.classList.add('active');
        container.classList.add('active');
      });

      box.addEventListener('mouseleave', () => {
        isHovered = false;
      });
    });
  });

 emailjs.init("OD82OQvIM6FTb-Yvi");

const subscribeForm = document.getElementById("subscribe-form");
if (subscribeForm) {
  subscribeForm.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm("service_rditdcw", "template_oi0u4u8", this)
      .then(() => {
        alert("✅ Дякуємо! Ви успішно підписані.");
        subscribeForm.reset();
      }, (error) => {
        alert("❌ Помилка при підписці: " + JSON.stringify(error));
      });
  });
}


});
