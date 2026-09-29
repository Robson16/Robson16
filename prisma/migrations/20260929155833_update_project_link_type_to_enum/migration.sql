CREATE TYPE "ProjectLinkType" AS ENUM ('GITHUB', 'GITLAB', 'WEBSITE', 'FIGMA', 'YOUTUBE', 'OTHER');
 
ALTER TABLE "ProjectLink"
  ALTER COLUMN "type" TYPE "ProjectLinkType" 
  USING (
    CASE 
      WHEN UPPER("type") IN ('GITHUB', 'GITLAB', 'FIGMA', 'YOUTUBE') THEN UPPER("type")::"ProjectLinkType"
      WHEN UPPER("type") IN ('WEBSITE', 'LIVE PREVIEW') THEN 'WEBSITE'::"ProjectLinkType"
      ELSE 'OTHER'::"ProjectLinkType"
    END
  );