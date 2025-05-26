import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import { ReactNode } from "react";

interface DrawerLink { text: string, icon: ReactNode, href: string };
interface DrawerListProps { links: DrawerLink[] };

export default function DrawerList({ links }: DrawerListProps) {
    return <List>
        {links.map(link => (
            <Link key={link.text} href={link.href}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>{link.icon}</ListItemIcon>
                        <ListItemText primary={link.text} />
                    </ListItemButton>
                </ListItem>
            </Link>
        ))}
    </List>;
}