const draggables = document.querySelectorAll<HTMLParagraphElement>('.draggable');
const containers = document.querySelectorAll<HTMLDivElement>('.container');

draggables.forEach((draggable) => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging');
  });

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
  });
});

containers.forEach((container) => {
  container.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement: finObjT = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector<HTMLParagraphElement>('.dragging')!;
    if (afterElement.element == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement.element);
    }
  });
});

type finObjT = {
  offset: number;
  element?: HTMLParagraphElement | null;
};

function getDragAfterElement(container: HTMLDivElement, y: number) {
  const draggableElements = Array.from<HTMLParagraphElement>(container.querySelectorAll('.draggable:not(.dragging)'));

  return draggableElements.reduce<finObjT>(
    (closest: finObjT, child: HTMLParagraphElement) => {
      const box: DOMRect = child.getBoundingClientRect();
      const offset: number = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY, element: null }
  );
}
