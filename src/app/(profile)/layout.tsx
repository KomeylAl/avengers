import ProfileCard from "./_components/ProfileCard";
import ProfileMenu from "./_components/ProfileMenu";
import { redirect } from "next/navigation";

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-full px-12 lg:px-32 flex items-start gap-6 pt-30 pb-10">
    <ProfileMenu />
    <div className="w-full flex flex-col items-start gap-3">
      <ProfileCard />
      {children}
    </div>
  </div>;
}
