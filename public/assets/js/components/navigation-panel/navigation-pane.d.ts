import { LitElement } from 'lit-element';
export declare class NavigationPane extends LitElement {
    static styles: import("lit-element").CSSResult;
    expandedWidth: number;
    minimizedWidth: number;
    isExpanded: boolean;
    getButton: () => import("lit-element").TemplateResult;
    getSubClass: () => "expanded" | "minimized";
    toggleButton: () => void;
    buttonExpand: import("lit-element").TemplateResult;
    buttonMinimize: import("lit-element").TemplateResult;
    updated(changedProperties: any): void;
    render(): import("lit-element").TemplateResult[];
}
//# sourceMappingURL=navigation-pane.d.ts.map