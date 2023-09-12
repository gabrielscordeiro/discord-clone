import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { NavigationAction } from "@/components/navigation/navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "@/components/navigation/navigation-item";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

export const NavigationSidebar = async () => {
    const profile = await currentProfile();

    if(!profile) {
        return redirect('/')
    }

    const serves = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })
    return (
        <div className="flex flex-col items-center space-y-4 w-full h-full text-primary dark:bg-[#1E1F22] py-3">
            <NavigationAction />
            <Separator
                className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"
            />

            <ScrollArea className="flex-1 w-full mb-4">
                {serves.map((server)=>(
                    <div key={server.id}>
                        <NavigationItem
                            id={server.id}
                            name={server.name}
                            imageUrl={server.imageUrl}
                        />
                    </div>
                ))}
            </ScrollArea>

            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <ModeToggle />

                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: "w-[48px] h-[48px]"
                        }
                    }}
                />
            </div>
        </div>
    )
}

