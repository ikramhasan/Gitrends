import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/react";

export default function MainNav() {
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Gitrends</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        {/* <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem> */}
      </NavbarContent>
    </Navbar>
  );
}
