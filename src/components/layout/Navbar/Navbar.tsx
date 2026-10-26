import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container/Container";
import WhatsAppButton from "@/components/ui/WhatsAppButton/WhatsAppButton";
import MobileMenu from "@/components/layout/MobileMenu/MobileMenu";
import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.root}>
      <Container className={styles.inner}>
        <Link
          className={styles.brand}
          href="/#inicio"
          aria-label="Kaibo Security, inicio"
        >
          {siteConfig.logo ? (
            <Image
              src={siteConfig.logo.src}
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
              alt="Kaibo Security"
              unoptimized
            />
          ) : (
            <span>
              <strong>
                KAIBO<span className={styles.brandDot}>.</span>
              </strong>
              <span className={styles.brandSubtitle}>SECURITY</span>
            </span>
          )}
        </Link>

        {/**Link */}
        <nav
          className={styles.desktop}
          aria-label="Navegación principal"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={"/" + item.href}
            >
              {item.label}
            </Link>
          ))}
          <WhatsAppButton label="WhatsApp" />
        </nav>
        <MobileMenu />
      </Container>
    </header>
  );
}
