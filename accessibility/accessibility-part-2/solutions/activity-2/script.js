document.addEventListener('DOMContentLoaded', function() {
    var links = document.querySelectorAll('.cta-link');
    links.forEach(function(link) {
        var heading = link.closest('.column').querySelector('h3').textContent;
        link.setAttribute('aria-label', 'Find out more - ' + heading);
    });
});
