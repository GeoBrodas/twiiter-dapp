const anchor = require("@project-serum/anchor");

describe("rust-prog", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  it("Is initialized!", async () => {
    // Add your test here.
    const program = anchor.workspace.RustProg;
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
