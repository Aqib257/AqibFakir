/**
 * AQIB FAKIR - Modern Resume Interactive Helper
 */
document.addEventListener('DOMContentLoaded', () => {
  const printBtn = document.getElementById('printBtn');
  const photoUpload = document.getElementById('photoUpload');
  const candidatePhoto = document.getElementById('candidatePhoto');
  const photoContainer = document.getElementById('photoContainer');
  const themeToggleBtn = document.getElementById('themeToggleBtn');

  // 1. Direct Print to PDF / Paper
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // 2. Clickable photo container triggers upload
  if (photoContainer && photoUpload) {
    photoContainer.addEventListener('click', () => {
      photoUpload.click();
    });
  }

  // 3. Photo Upload & Instant Local Preview
  if (photoUpload && candidatePhoto) {
    photoUpload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          candidatePhoto.src = event.target.result;
          localStorage.setItem('aqib_profile_photo', event.target.result);
        };
        reader.readAsDataURL(file);
      }
    });

    // Check if photo was previously stored in local session
    const savedPhoto = localStorage.getItem('aqib_profile_photo');
    if (savedPhoto) {
      candidatePhoto.src = savedPhoto;
    }
  }

  // 4. Color Theme Cycling (Navy Classic, Royal Indigo, Teal Corporate)
  const themes = ['', 'theme-royal', 'theme-teal'];
  let currentThemeIndex = 0;

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      // Remove current theme
      if (themes[currentThemeIndex]) {
        document.body.classList.remove(themes[currentThemeIndex]);
      }
      currentThemeIndex = (currentThemeIndex + 1) % themes.length;
      if (themes[currentThemeIndex]) {
        document.body.classList.add(themes[currentThemeIndex]);
      }
    });
  }
});
