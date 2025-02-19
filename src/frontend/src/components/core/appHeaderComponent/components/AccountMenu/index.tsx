import ForwardedIconComponent from "@/components/common/genericIconComponent";
import { useLogout } from "@/controllers/API/queries/auth";
import { CustomFeedbackDialog } from "@/customization/components/custom-feedback-dialog";
import { CustomHeaderMenuItemsTitle } from "@/customization/components/custom-header-menu-items-title";
import { CustomProfileIcon } from "@/customization/components/custom-profile-icon";
import { ENABLE_DATASTAX_LANGFLOW } from "@/customization/feature-flags";
import { useCustomNavigate } from "@/customization/hooks/use-custom-navigate";
import useAuthStore from "@/stores/authStore";
// import { useDarkStore } from "@/stores/darkStore";
import { useState } from "react";
import { useParams } from "react-router-dom";
import GithubStarComponent from "../GithubStarButton";
import {
  HeaderMenu,
  HeaderMenuItemButton,
  HeaderMenuItemLink,
  HeaderMenuItems,
  HeaderMenuItemsSection,
  HeaderMenuToggle,
} from "../HeaderMenu";
// import { ProfileIcon } from "../ProfileIcon";
import ThemeButtons from "../ThemeButtons";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

// TODO: This is a real Profile Icon SVG but anyway I can't change this behavior at current moment
const ProfileIcon = () => <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_123_1891)">
<path d="M32 12.19H30.47V19.81H32V12.19Z" fill="white"/>
<path d="M30.4699 19.81H28.95V22.86H30.4699V19.81Z" fill="white"/>
<path d="M30.4699 9.14H28.95V12.19H30.4699V9.14Z" fill="white"/>
<path d="M28.9501 22.86H27.4301V25.9H28.9501V22.86Z" fill="white"/>
<path d="M28.9501 6.1H27.4301V9.14H28.9501V6.1Z" fill="white"/>
<path d="M27.43 25.9H25.9V27.43H27.43V25.9Z" fill="white"/>
<path d="M27.43 4.57H25.9V6.1H27.43V4.57Z" fill="white"/>
<path d="M25.9 27.43H22.85V28.95H25.9V27.43Z" fill="white"/>
<path d="M25.9 3.05H22.85V4.57H25.9V3.05Z" fill="white"/>
<path d="M22.85 21.33H21.33V22.86H22.85V21.33Z" fill="white"/>
<path d="M9.14 15.24H10.66V13.71H21.33V15.24H22.85V21.33H24.38V9.14H22.85V7.62H21.33V6.1H10.66V7.62H9.14V9.14H7.62V21.33H9.14V15.24Z" fill="white"/>
<path d="M22.8501 28.95H19.8101V30.48H22.8501V28.95Z" fill="white"/>
<path d="M21.3301 22.86H19.8101V24.38H21.3301V22.86Z" fill="white"/>
<path d="M21.3301 16.76H19.8101V19.81H21.3301V16.76Z" fill="white"/>
<path d="M22.8501 1.52H19.8101V3.05H22.8501V1.52Z" fill="white"/>
<path d="M19.8099 30.48H12.1899V32H19.8099V30.48Z" fill="white"/>
<path d="M19.8099 24.38H12.1899V25.9H19.8099V24.38Z" fill="white"/>
<path d="M18.28 21.33H13.71V22.86H18.28V21.33Z" fill="white"/>
<path d="M19.8099 0H12.1899V1.52H19.8099V0Z" fill="white"/>
<path d="M12.19 28.95H9.14001V30.48H12.19V28.95Z" fill="white"/>
<path d="M12.19 22.86H10.66V24.38H12.19V22.86Z" fill="white"/>
<path d="M12.19 16.76H10.66V19.81H12.19V16.76Z" fill="white"/>
<path d="M12.19 1.52H9.14001V3.05H12.19V1.52Z" fill="white"/>
<path d="M10.66 21.33H9.14001V22.86H10.66V21.33Z" fill="white"/>
<path d="M9.13997 27.43H6.08997V28.95H9.13997V27.43Z" fill="white"/>
<path d="M9.13997 3.05H6.08997V4.57H9.13997V3.05Z" fill="white"/>
<path d="M6.08995 25.9H4.56995V27.43H6.08995V25.9Z" fill="white"/>
<path d="M6.08995 4.57H4.56995V6.1H6.08995V4.57Z" fill="white"/>
<path d="M4.57005 22.86H3.05005V25.9H4.57005V22.86Z" fill="white"/>
<path d="M4.57005 6.1H3.05005V9.14H4.57005V6.1Z" fill="white"/>
<path d="M3.05002 19.81H1.52002V22.86H3.05002V19.81Z" fill="white"/>
<path d="M3.05002 9.14H1.52002V12.19H3.05002V9.14Z" fill="white"/>
<path d="M1.52 12.19H0V19.81H1.52V12.19Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_123_1891">
<rect width="32" height="32" fill="white"/>
</clipPath>
</defs>
</svg>


export const AccountMenu = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const { customParam: id } = useParams();
  // const version = useDarkStore((state) => state.version);
  const navigate = useCustomNavigate();
  const { mutate: mutationLogout } = useLogout();

  const { isAdmin, autoLogin } = useAuthStore((state) => ({
    isAdmin: state.isAdmin,
    autoLogin: state.autoLogin,
  }));

  const handleLogout = () => {
    mutationLogout();
  };

  return (
    <>
      <HeaderMenu>
        <HeaderMenuToggle>
          <div
            className="h-7 w-7   focus-visible:outline-0"
            data-testid="user-profile-settings"
          >
            {ENABLE_DATASTAX_LANGFLOW ? <CustomProfileIcon /> : <ProfileIcon />}
          </div>
        </HeaderMenuToggle>
        <HeaderMenuItems position="right">
          {ENABLE_DATASTAX_LANGFLOW && (
            <HeaderMenuItemsSection>
              <CustomHeaderMenuItemsTitle />
            </HeaderMenuItemsSection>
          )}
          <HeaderMenuItemsSection>
            {/* <div className="flex h-[46px] w-full items-center justify-between px-3">
              <div className="pl-1 text-xs text-zinc-500">
                Version {version}
              </div>
              {!ENABLE_DATASTAX_LANGFLOW && <ThemeButtons />}
            </div> */}
            {ENABLE_DATASTAX_LANGFLOW ? (
              <HeaderMenuItemLink newPage href={`/settings/org/${id}/overview`}>
                Account Settings
              </HeaderMenuItemLink>
            ) : (
              <HeaderMenuItemButton
                icon="arrow-right"
                onClick={() => {
                  navigate("/settings");
                }}
              >
                Settings
              </HeaderMenuItemButton>
            )}
            {!ENABLE_DATASTAX_LANGFLOW && (
              <>
                {isAdmin && !autoLogin && (
                  <a href="/admin">
                    <DropdownMenuItem
                      className="group flex cursor-pointer items-center justify-between p-3 px-4"
                    >
                      Admin Page
                    </DropdownMenuItem>
                  </a>
  
                )}
              </>
            )}
            {/* {ENABLE_DATASTAX_LANGFLOW ? (
              <HeaderMenuItemButton onClick={() => setIsFeedbackOpen(true)}>
                Feedback
              </HeaderMenuItemButton>
            ) : (
              <HeaderMenuItemLink newPage href="https://docs.langflow.org">
                Docs
              </HeaderMenuItemLink>
            )} */}
          </HeaderMenuItemsSection>
          {/* <HeaderMenuItemsSection> */}
            {/* {ENABLE_DATASTAX_LANGFLOW ? (
              <HeaderMenuItemLink
                newPage
                href="https://github.com/langflow-ai/langflow"
              >
                <div className="-my-2 mr-2 flex w-full items-center justify-between">
                  <div className="text-sm">Star the repo</div>
                  <GithubStarComponent />
                </div>
              </HeaderMenuItemLink>
            ) : (
              <HeaderMenuItemLink
                newPage
                href="https://github.com/langflow-ai/langflow/discussions"
              >
                Share Feedback on Github
              </HeaderMenuItemLink>
            )} */}
            {/* <HeaderMenuItemLink newPage href="https://twitter.com/langflow_ai">
              Follow Langflow on X
            </HeaderMenuItemLink> */}
            {/* <HeaderMenuItemLink newPage href="https://discord.gg/EqksyE2EX9"> */}
              {/* Join the Langflow Discord */}
            {/* </HeaderMenuItemLink> */}
          {/* </HeaderMenuItemsSection> */}
          {ENABLE_DATASTAX_LANGFLOW ? (
            <HeaderMenuItemsSection>
              <HeaderMenuItemLink href="/session/logout" icon="log-out">
                Logout
              </HeaderMenuItemLink>
            </HeaderMenuItemsSection>
          ) : (
            !autoLogin && (
              <HeaderMenuItemsSection>
                <HeaderMenuItemButton onClick={handleLogout} icon="log-out">
                  Logout
                </HeaderMenuItemButton>
              </HeaderMenuItemsSection>
            )
          )}
        </HeaderMenuItems>
      </HeaderMenu>
      <CustomFeedbackDialog
        isOpen={isFeedbackOpen}
        setIsOpen={setIsFeedbackOpen}
      />
    </>
  );
};
