// FIX RESPONSIVE COVERFLOW – SAFE PATCH

function getResponsiveValues(absOffset, sign) {
    let baseX, baseZ, maxRotate, scaleFactor;

    if (window.innerWidth < 480) {
        baseX = 110;
        baseZ = 60;
        maxRotate = 40;
        scaleFactor = 0.07;
    } else if (window.innerWidth < 768) {
        baseX = 150;
        baseZ = 120;
        maxRotate = 45;
        scaleFactor = 0.08;
    } else {
        baseX = 220;
        baseZ = 200;
        maxRotate = 60;
        scaleFactor = 0.1;
    }

    return {
        translateX: (sign * absOffset) * baseX,
        translateZ: -absOffset * baseZ,
        rotateY: -sign * Math.min(absOffset * maxRotate, maxRotate),
        scale: 1 - (absOffset * scaleFactor)
    };
}

(function override() {
    const originalUpdate = updateCoverflow;

    updateCoverflow = function() {
        originalUpdate();

        document.querySelectorAll('.coverflow-item').forEach((item, index) => {
            const offset = index - currentIndex;
            const absOffset = Math.abs(offset);
            const sign = Math.sign(offset);

            const v = getResponsiveValues(absOffset, sign);

            item.style.transform =
                `translateX(${v.translateX}px)
                 translateZ(${v.translateZ}px)
                 rotateY(${v.rotateY}deg)
                 scale(${v.scale})`;
        });
    };
})();
