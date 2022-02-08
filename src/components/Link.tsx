import * as React from "react";
import clsx from "clsx";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";

import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import { SxProps, Theme } from "@mui/system";

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled("a")({});

interface NextLinkComposedProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    Omit<NextLinkProps, "href" | "as"> {
  to: NextLinkProps["href"];
  linkAs?: NextLinkProps["as"];
  href?: NextLinkProps["href"];
}

export const NextLinkComposed = React.forwardRef<
  HTMLAnchorElement,
  NextLinkComposedProps
>(function NextLinkComposed(props, ref) {
  const {
    to,
    linkAs,
    href,
    replace,
    scroll,
    shallow,
    prefetch,
    locale,
    ...other
  } = props;

  return (
    <NextLink
      href={to}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref
      locale={locale}
    >
      <Anchor ref={ref} {...other} />
    </NextLink>
  );
});

const hoverStyles: SxProps<Theme> = {
  textDecoration: "none",
  display: "inline-block",
  position: "relative",
  ":after": {
    content: '""',
    position: "absolute",
    width: "100%",
    transform: "scaleX(0)",
    height: "2px",
    bottom: 0,
    left: 0,
    backgroundColor: "primary.main",
    transformOrigin: "bottom right",
    transition: "transform 0.25s ease-out",
  },
  ":hover:after": {
    transform: "scaleX(1)",
    transformOrigin: "bottom left",
  },
};

export type LinkProps = {
  activeClassName?: string;
  as?: NextLinkProps["as"];
  href: NextLinkProps["href"];
  noLinkStyle?: boolean;
  hoverStyle?: boolean;
} & Omit<NextLinkComposedProps, "to" | "linkAs" | "href"> &
  Omit<MuiLinkProps, "href">;

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  props,
  ref
) {
  const {
    activeClassName = "active",
    as: linkAs,
    className: classNameProps,
    href,
    noLinkStyle,
    hoverStyle,
    role, // Link don't have roles.
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof href === "string" ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  const isExternal =
    typeof href === "string" &&
    (href.indexOf("http") === 0 || href.indexOf("mailto:") === 0);

  if (isExternal) {
    if (noLinkStyle) {
      return (
        <Anchor
          className={className}
          href={href}
          ref={ref}
          style={{ textDecoration: "none", color: "inherit" }}
          {...other}
        />
      );
    }

    return <MuiLink className={className} href={href} ref={ref} {...other} />;
  }

  if (noLinkStyle) {
    return (
      <NextLinkComposed
        className={className}
        ref={ref}
        to={href}
        style={{ textDecoration: "none", color: "inherit" }}
        {...other}
      />
    );
  }

  return (
    <MuiLink
      component={NextLinkComposed}
      linkAs={linkAs}
      className={className}
      sx={!!hoverStyle ? hoverStyles : undefined}
      ref={ref}
      to={href}
      {...other}
    />
  );
});

export default Link;
