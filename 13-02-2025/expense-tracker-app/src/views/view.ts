export default abstract class View<TData> {
  abstract container: Element;
  protected data: TData | null = null;

  render(data: TData | null = null, append = false) {
    this.data = data;

    if (append)
      this.container.insertAdjacentHTML("beforeend", this.generateMarkup());
    else this.container.innerHTML = this.generateMarkup();
  }

  abstract generateMarkup(): string;
}
