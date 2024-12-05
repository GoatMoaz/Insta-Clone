import { Home } from "./Home";
import { Search } from "./Search";
import { Notifications } from "./Notifications";
import { Post } from "./Post";

export const SidebarItems = () => {
  return (
    <>
      <Home />
      <Search />
      <Notifications />
      <Post />
    </>
  );
};
