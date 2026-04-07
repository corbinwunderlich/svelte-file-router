{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";

    git-hooks = {
      url = "github:cachix/git-hooks.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    flake-parts,
    git-hooks,
    ...
  } @ inputs:
    flake-parts.lib.mkFlake {inherit inputs;} {
      imports = [git-hooks.flakeModule];

      systems = ["x86_64-linux" "x86_64-darwin" "aarch64-linux" "aarch64-darwin"];

      perSystem = {
        pkgs,
        self',
        config,
        ...
      }: {
        packages = {
        };

        pre-commit.settings = {
          hooks = {
            alejandra.enable = true;

            eslint = {
              enable = true;
              settings = {
                binPath = "./node_modules/.bin/eslint --cache --concurrency auto";
                extensions = "\\.(?:js|svelte|ts|css)$";
              };
            };
          };
        };

        devShells.default = pkgs.mkShell {
          packages = with pkgs;
            [
              nodejs_22
            ]
            ++ [
              config.pre-commit.settings.enabledPackages
            ];

          shellHook = config.pre-commit.shellHook;

          TERM = "xterm-256color";
        };
      };
    };
}
