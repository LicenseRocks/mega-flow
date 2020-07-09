export const handleScroll = (el) => {
  const slider = el;
  let isDown = false;
  let startX;
  let sl;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    sl = slider.scrollLeft;
  });
  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });
  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });
  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    slider.classList.add("active");
    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;
    slider.scrollLeft = sl - walk;
  });
};
