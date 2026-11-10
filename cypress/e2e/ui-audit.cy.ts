const VIEWPORTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "sm", width: 640, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "lg", width: 1024, height: 768 },
  { name: "desktop", width: 1440, height: 900 },
] as const;

function assertNoHorizontalOverflow(contextLabel: string) {
  cy.window().then((win) => {
    const docEl = win.document.documentElement;
    expect(
      docEl.scrollWidth,
      `${contextLabel}: horizontal overflow detected (scrollWidth=${docEl.scrollWidth}, innerWidth=${win.innerWidth})`
    ).to.be.at.most(win.innerWidth);
  });
}

function assertHeaderIntegrity(isMobile: boolean) {
  cy.get("header").should("be.visible");
  cy.get("header nav a[href='/']").should("be.visible");

  if (isMobile) {
    cy.get("header button[aria-controls='navbarContent']").should("be.visible");
  } else {
    cy.get("header ul a").should("have.length", 4).each(($el) => {
      cy.wrap($el).should("be.visible");
    });
  }
}

describe("UI & Responsive Audit", () => {
  it("audits /classes across all resolutions", () => {
    VIEWPORTS.forEach((vp) => {
      cy.viewport(vp.width, vp.height);
      cy.visit("/classes");
      cy.get("h1").should("contain.text", "Aulas");
      cy.get("article").should("have.length.at.least", 1);
      cy.document().its("fonts.ready");
      cy.wait(450);
      cy.window().then((win) => {
        const bodyFont = win.getComputedStyle(win.document.body).fontFamily;
        const h1 = win.document.querySelector("h1");
        const article = win.document.querySelector("article");
        expect(bodyFont, "body font uses Inter").to.match(/Inter/i);
        expect(h1 ? win.getComputedStyle(h1).fontFamily : "", "h1 font uses Inter").to.match(/Inter/i);
        expect(article ? win.getComputedStyle(article).borderRadius : "", "subtle card radius").to.equal("6px");
      });
      assertHeaderIntegrity(vp.width < 1024);
      assertNoHorizontalOverflow(`/classes (${vp.name})`);
      cy.screenshot(`classes-${vp.name}`, { capture: "viewport" });
    });
  });

  it("audits mobile hamburger menu interaction and layout", () => {
    cy.viewport(375, 812);
    cy.visit("/classes");
    cy.get("button[aria-controls='navbarContent']")
      .should("have.attr", "aria-expanded", "false")
      .click();
    cy.get("#navbarContent").should("be.visible");
    cy.wait(350);
    assertNoHorizontalOverflow("mobile menu open");
    cy.screenshot("mobile-menu-open", { capture: "viewport" });

    cy.get("#navbarContent a[href='/calendar']").click();
    cy.url().should("include", "/calendar");
    cy.get("#navbarContent").should("not.exist");
  });

  it("audits active alerts banner and dismiss interaction", () => {
    cy.clock(new Date("2026-09-15T10:00:00").getTime(), ["Date"]);
    cy.viewport(375, 812);
    cy.visit("/classes");
    cy.get("section[role='status']").should("have.length.at.least", 1);
    cy.wait(450);
    assertNoHorizontalOverflow("alerts mobile");
    cy.screenshot("alerts-mobile", { capture: "viewport" });

    cy.get("section[role='status']").first().find("button").click();
    cy.wait(400);
    cy.viewport(1440, 900);
    cy.visit("/classes");
    cy.get("section[role='status']").should("have.length", 1);
    cy.wait(450);
    cy.screenshot("alerts-desktop", { capture: "viewport" });
  });

  it("audits /calendar list and table views across resolutions", () => {
    [
      { name: "mobile", width: 375, height: 812 },
      { name: "tablet", width: 768, height: 1024 },
      { name: "desktop", width: 1440, height: 900 },
    ].forEach((vp) => {
      cy.viewport(vp.width, vp.height);
      cy.visit("/calendar");
      cy.get("h1").should("contain.text", "Calendário");
      cy.get("table").should("be.visible");
      cy.wait(450);
      assertNoHorizontalOverflow(`/calendar list (${vp.name})`);
      cy.get("table").then(($table) => {
        const wrapper = $table.parent()[0];
        expect(
          wrapper.scrollWidth,
          `/calendar list table overflow (${vp.name})`
        ).to.be.at.most(wrapper.clientWidth + 1);
      });
      cy.screenshot(`calendar-list-${vp.name}`, { capture: "viewport" });

      cy.contains("button", "Tabela").click();
      cy.window().scrollTo(0, 0);
      cy.contains("button", "Tabela").should("have.attr", "aria-pressed", "true");
      cy.contains("button", "Anterior").should("be.visible");
      cy.contains("h2", /2026/i).should("be.visible");
      cy.get("table thead th").should("have.length", 7);
      cy.wait(350);
      assertNoHorizontalOverflow(`/calendar table (${vp.name})`);
      cy.screenshot(`calendar-table-${vp.name}`, { capture: "viewport" });
    });
  });

  it("audits /calendar table navigation and event tooltip", () => {
    cy.viewport(1440, 900);
    cy.visit("/calendar");
    cy.contains("button", "Tabela").click();
    cy.get("table thead th").should("have.length", 7);
    cy.wait(300);

    cy.contains("button", "Anterior").click();
    cy.window().scrollTo(0, 0);
    cy.contains("h2", /outubro 2026/i).should("be.visible");
    cy.get("table button").should("have.length", 2);
    cy.wait(300);

    cy.get("table button").first().focus();
    cy.get("[role='tooltip']")
      .should("be.visible")
      .then(($tooltip) => {
        cy.window().then((win) => {
          const rect = $tooltip[0].getBoundingClientRect();
          expect(rect.left, "tooltip left within viewport").to.be.at.least(0);
          expect(rect.right, "tooltip right within viewport").to.be.at.most(win.innerWidth);
        });
      });
    cy.wait(250);
    cy.screenshot("calendar-tooltip-desktop", { capture: "viewport" });
  });

  it("audits /class/[slug], /resources, /student-page, and 404", () => {
    [
      { name: "mobile", width: 375, height: 812 },
      { name: "desktop", width: 1440, height: 900 },
    ].forEach((vp) => {
      cy.viewport(vp.width, vp.height);

      cy.visit("/class/20260704");
      cy.get("nav[aria-label='Breadcrumb']").should("contain.text", "04/07/2026");
      cy.wait(450);
      assertNoHorizontalOverflow(`/class/20260704 (${vp.name})`);
      cy.screenshot(`class-detail-${vp.name}`, { capture: "viewport" });

      cy.visit("/resources");
      cy.get("h1").should("contain.text", "Recursos");
      cy.wait(450);
      assertNoHorizontalOverflow(`/resources (${vp.name})`);
      cy.screenshot(`resources-${vp.name}`, { capture: "viewport" });

      cy.visit("/student-page");
      cy.get("#student-user").type("Joao").blur();
      cy.get("#student-user-error").should("be.visible");
      cy.get("#student-password").type("15032010").should("have.value", "15 03 2010");
      cy.wait(400);
      assertNoHorizontalOverflow(`/student-page (${vp.name})`);
      cy.screenshot(`student-login-${vp.name}`, { capture: "viewport" });

      cy.visit("/rota-inexistente", { failOnStatusCode: false });
      cy.contains("#404").should("be.visible");
      cy.wait(300);
      assertNoHorizontalOverflow(`/404 (${vp.name})`);
      cy.screenshot(`not-found-${vp.name}`, { capture: "viewport" });
    });
  });
});

