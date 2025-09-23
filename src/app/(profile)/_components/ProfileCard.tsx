"use client";

import { Button } from "@/components/ui/button";
import { profileImageText } from "@/core/utils/helpers";
import { useGetUser } from "@/hooks/useUser";
import Image from "next/image";
import React, { useState } from "react";
import { FaRegCalendar } from "react-icons/fa";
import { TbPlanet } from "react-icons/tb";
import { TiWarningOutline } from "react-icons/ti";
import { IoIosCheckmark } from "react-icons/io";
import { LiaEdit } from "react-icons/lia";
import { IoExitOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import Link from "next/link";

const ProfileCard = () => {
  const { data, isLoading, error } = useGetUser();

  const [loading, setLoading] = useState(false);

  const date = new Date(data?.createdAt);

  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  const joinedAt = `Joined at ${month} ${year}`;

  const handleLogout = async () => {
    setLoading(true);
    try {
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-lg bg-gradient-to-br from-[rgba(30,29,27,0.95)] to-[rgba(40,36,33,0.9)] p-6 shadow-2xl border border-[#403C39] flex flex-col lg:flex-row items-start gap-5">
      {data && (
        <>
          <div className="w-44 h-full flex lg:flex-col">
            <div className="w-40 h-40 relative">
              <div className="w-40 h-40 bg-golden rounded-full flex items-center justify-center overflow-hidden">
                {data.image ? (
                  <Image
                    src={data.image}
                    alt="User Profile"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="font-bold text-3xl text-niceblack">
                    {profileImageText(data.profile.name)}
                  </p>
                )}
              </div>
              {data.verification === "VERIFIED" && (
                <div className="w-10 h-10 rounded-full bg-blue-500 absolute bottom-0 right-0 flex items-center justify-center text-nicewhite border border-nicewhite">
                  <IoIosCheckmark size={50} />
                </div>
              )}
            </div>
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 justify-center mt-5 bg-golden cursor-pointer shadow-xl"
            >
              <LiaEdit /> Edit Profile
            </Button>
            <Button
              className="w-full flex items-center gap-2 justify-center mt-5 cursor-pointer shadow-xl border border-nicewhite disabled:cursor-pointer"
              onClick={handleLogout}
              disabled={loading}
            >
              <IoExitOutline /> Sign Out
            </Button>
          </div>
          <div className="w-full">
            <p className="text-nicewhite text-2xl font-bold">{data.profile.name}</p>
            <p className="text-golden mt-3">
              {data.profile?.username
                ? `@${data.profile.username}`
                : `no username`}
            </p>
            <p className="text-nicewhite mt-5">
              {data.profile?.bio ? `${data.profile.bio}` : `no bio`}
            </p>
            <div className="w-full flex flex-wrap lg:gap-6 items-center justify-start mt-2">
              <p className="text-cyan mt-5 flex items-center gap-2">
                <FaRegCalendar /> {joinedAt}
              </p>
              <p className="text-cyan mt-5 flex items-center gap-2">
                <TbPlanet />{" "}
                {data.profile?.website
                  ? `@${data.profile.website}`
                  : `no website`}
              </p>
            </div>
            <div className="w-full flex flex-wrap items-center gap-4 mt-5">
              <div className="w-32 h-20 bg-golden/20 rounded-lg border border-golden flex flex-col items-center justify-center gap-1 text-white">
                <p className="font-bold text-xl">
                  {data.scenarios?.length ?? 0}
                </p>
                <p className="text-sm text-nicewhite/50">Scenarios</p>
              </div>
              <div className="w-32 h-20 bg-golden/20 rounded-lg border border-golden flex flex-col items-center justify-center gap-1 text-white">
                <p className="font-bold text-xl">
                  {data.followers?.length ?? 0}
                </p>
                <p className="text-sm text-nicewhite/50">Followers</p>
              </div>
              <div className="w-32 h-20 bg-golden/20 rounded-lg border border-golden flex flex-col items-center justify-center gap-1 text-white">
                <p className="font-bold text-xl">
                  {data.following?.length ?? 0}
                </p>
                <p className="text-sm text-nicewhite/50">Following</p>
              </div>
              <div className="w-32 h-20 bg-golden/20 rounded-lg border border-golden flex flex-col items-center justify-center gap-1 text-white">
                <p className="font-bold text-xl">{data.likes?.length ?? 0}</p>
                <p className="text-sm text-nicewhite/50">Likes</p>
              </div>
            </div>
            {!data.emailVerified && (
              <div className="w-full mt-5 p-4 rounded-lg border border-nicered flex items-center gap-3">
                <TiWarningOutline size={25} className="text-nicered" />{" "}
                <p className="text-nicewhite">
                  Your account has not verified yet.{" "}
                  <Link href="/auth/verify" className="underline">
                    Verify your account.
                  </Link>
                </p>
              </div>
            )}
            {(!data.profile?.username || !data.profile?.bio) && (
              <div className="w-full mt-5 p-4 rounded-lg border border-amber-400 flex items-center gap-3">
                <TiWarningOutline size={25} className="text-amber-400" />{" "}
                <p className="text-nicewhite">
                  Your account has not completed yet.{" "}
                  <Link href="/profile/settings" className="underline">
                    Complete your account.
                  </Link>
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {isLoading && (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfileCard;
