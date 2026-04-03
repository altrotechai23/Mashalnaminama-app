export {};

declare global {
  // Clerk Session Metadata Types
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "super_user" | "admin" | "customer";
      address?: string;
      phone?: string;
    };
  }

  // Allow importing CSS files
  declare module "*.css" {
    const content: { [className: string]: string };
    export default content;
  }

  // Allow importing video files for the hero section
  declare module "*.mp4" {
    const src: string;
    export default src;
  }
  declare global {
    interface CustomJwtSessionClaims {
      metadata: {
        role?: "super_user" | "admin" | "user";
      };
    }
}

}
