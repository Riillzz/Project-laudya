// Hilangkan efek 3D saat layar kecil
if (window.innerWidth < 768) {

    updateCoverflow = function () {
        // disable seluruh animasi 3D untuk mode mobile
        document.querySelectorAll('.coverflow-item').forEach((item) => {
            item.style.transform = "none";
        });
    };
}
