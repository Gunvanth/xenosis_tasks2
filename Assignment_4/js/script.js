function toggleNav() {
    const sideNav = document.getElementById('sideNav');
    sideNav.classList.toggle('active');
  }
  
  function closeNavIfOpen(event) {
    const sideNav = document.getElementById('sideNav');
    const menuButton = document.getElementById('menuButton');
    
    // Close the nav if it is open and the click is outside the nav and menu button
    if (sideNav.classList.contains('active') && !sideNav.contains(event.target) && !menuButton.contains(event.target)) {
      sideNav.classList.remove('active');
    }
  }
  
  // Add event listener to close the nav when clicking outside on mobile devices
  document.addEventListener('click', closeNavIfOpen);