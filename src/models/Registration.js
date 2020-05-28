export default class Registration {
  registration = {};

  constructor(registration) {
    this.registration = registration;
  }

  get id() {
    return this.registration.elements.find(
      elements => elements.name === "title"
    ).elements[0].text;
  }

  get publishedDate() {
    return new Date(
      this.registration.elements.find(
        elements => elements.name === "published"
      ).elements[0].text
    );
  }

  get updatedDate() {
    return new Date(
      this.registration.elements.find(
        elements => elements.name === "updated"
      ).elements[0].text
    );
  }

  get content() {
    return this.registration.elements.find(
      elements => elements.name === "content"
    ).elements[0];
  }

  get type() {
    switch (this.content.name) {
      case "AppleRegistrationDescription":
        return "iOS";
      default:
        return "Android";
    }
  }

  get tags() {
    return this.content.elements
      .find(element => element.name === "Tags")
      .elements[0].text.split(",");
  }
}
