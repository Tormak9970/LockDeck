import {
  afterPatch,
  fakeRenderComponent,
  findInReactTree,
  findInTree,
  findModuleChild,
  RoutePatch,
  ServerAPI,
} from "decky-frontend-lib";
import { ReactElement } from "react";
import { LockDeckManager } from "../state/LockDeckManager";

const LockScreenModule = findModuleChild((mod) => {
  if (typeof mod !== 'object') return undefined;
  if (mod.PS && mod._9 && mod.f0 && mod.qH) return mod;
})

/**
 * Patches the Steam lockscreen to allow the plugin to change the styling.
 * @param serverAPI The plugin's serverAPI.
 * @param lockDeckManager The plugin's core state manager.
 * @returns A routepatch for the library.
 */
export const patchLockScreen = (serverAPI: ServerAPI, lockDeckManager: LockDeckManager): RoutePatch => {
  //* This only runs 1 time, which is perfect
  return serverAPI.routerHook.addPatch("/library/home", (props: { path: string; children: ReactElement; }) => {
    console.log("children:", props.children);
  
    afterPatch(props.children, "type", (_: Record<string, unknown>[], ret1: ReactElement) => {
      console.log("ret1:", ret1);
  
      return ret1;
    });
  
    return props
  })
};

// export const patchSettings = (serverAPI: ServerAPI, lockDeckManager: LockDeckManager) => {
//   return serverAPI.routerHook.addPatch("/settings", (props: { path: string; children: ReactElement; }) => {
//     //* This only runs once which is perfect
//     afterPatch(props.children, 'type', (_: any, ret: any) => {
//       console.log('settings ret 1', ret);

//       let firstCache: any;
//       let secondCache: any;

//       //* This cache is definitely fine
//       if (firstCache) {
//         ret.type = firstCache;
//       } else {
//         afterPatch(ret, 'type', (_: any, ret: any) => {
//           console.log('settings ret 2', ret);
//           console.log('pages:', ret?.props?.children?.props?.pages);
//           const homeElement = ret?.props?.children?.props?.pages?.find((obj: any) => obj.route === '/settings/home')?.content;
//           // if (homeElement === undefined) {
//           //   LogController.throw('Could not find internals element to patch');
//           // }


//           return ret;
//         });

//         firstCache = ret.type;
//       }

//       return ret;
//     });

//     return props;
//   });
// };


export async function getLockScreen() {
  while (!DeckyPluginLoader?.routerHook?.routes) {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  const settings = DeckyPluginLoader.routerHook.routes.find((x: ReactElement) => x?.props?.path == '/settings');
  const internalsPage = fakeRenderComponent(DeckyPluginLoader.routerHook.routes.find((x: ReactElement) => x?.props?.path == '/zoo').props.children.type);
  // let LoginScreen = findInReactTree(
  //   fakeRenderComponent(
  //     findInTree(
  //       fakeRenderComponent(DeckyPluginLoader.routerHook.routes.find((x: ReactElement) => x?.props?.path == '/zoo').props.children.type),
  //       (x) => x?.route === '/zoo/modals',
  //       {
  //         walkable: ['props', 'children', 'child', 'pages'],
  //       }
  //     ).content.type
  //   ),
  //   (x) => x?.title?.includes('AppActionsMenu')
  // ).children.type;

  // if (!LoginScreen?.prototype?.AddToHidden) {
  //   LoginScreen = fakeRenderComponent(LoginScreen).type;
  // }
  // return LoginScreen;
};

