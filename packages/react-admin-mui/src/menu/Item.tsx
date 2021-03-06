import { Button } from "@material-ui/core";
import { ButtonProps } from "@material-ui/core/Button";
import { ListItemProps } from "@material-ui/core/ListItem";
import * as React from "react";
import { IMenuLevel, MenuContext } from "./index";
import * as sc from "./Item.sc";

export interface IMenuItemProps extends IMenuLevel {
    text: string;
    icon?: React.ReactElement;
    secondaryAction?: React.ReactNode;
    enableMargin?: boolean;
}

type MuiListItemProps = Pick<ListItemProps, Exclude<keyof ListItemProps, "innerRef" | "button">> & { component?: React.ElementType };

export const MenuItem: React.FunctionComponent<IMenuItemProps & MuiListItemProps> = ({ text, icon, level, secondaryAction, ...otherProps }) => {
    const context = React.useContext(MenuContext);
    if (!context) throw new Error("Could not find context for menu");
    const hasIcon = !!icon;

    if (!icon && !context.open) icon = <sc.TextIcon selected={otherProps.selected}>{text.substr(0, 1).toUpperCase()}</sc.TextIcon>;
    if (level === undefined) level = 1;

    return (
        <sc.ListItem level={level} hasIcon={hasIcon} button menuOpen={context.open} {...otherProps}>
            {!!icon && <sc.ListItemIcon selected={otherProps.selected}>{icon}</sc.ListItemIcon>}
            <sc.ListItemText level={level} selected={otherProps.selected} primary={text} inset={!icon} />
            {!!secondaryAction && context.open && (
                <sc.ListItemSecondaryAction selected={otherProps.selected}>{secondaryAction}</sc.ListItemSecondaryAction>
            )}
        </sc.ListItem>
    );
};
