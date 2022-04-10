describe("pruebaIncomplete test", () => {
    it("test registro", () => {
        cy.visit("http://localhost:3000/login");
        cy.get("input[name='email']").type("test1@test.cl");
        cy.get("input[name='password']").type('123');
        cy.get("button").click()
        
    })
})
    
