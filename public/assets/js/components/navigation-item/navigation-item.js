export class NavigationItem {
    constructor(name, label) {
        if (!name) {
            throw new Error("Name argument is required when constructing NavigationItems");
        }
        this.name = name;
        this.label = label ? label : "";
    }
}
//# sourceMappingURL=navigation-item.js.map