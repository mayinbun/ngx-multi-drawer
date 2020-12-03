import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { DrawerComponent } from './drawer.component';
import { CommonModule } from '@angular/common';
import { DrawerOutletComponent } from './drawer-outlet/drawer-outlet.component';
import { DrawerEntry } from './drawer.model';
import { DrawerEntriesProvider, DrawerKeysProvider } from './providers';
import {
  DrawerOutletContainerComponent,
  DrawerOutletContainerProvider,
} from './drawer-outlet/drawer-outlet-container.component';

@NgModule({
  exports: [
    DrawerComponent,
  ],
  declarations: [
    DrawerComponent,
    DrawerOutletComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class DrawerModule {
  public static forRoot(
    drawerEntries: DrawerEntry[],
    customContainer: Type<any> = DrawerOutletContainerComponent,
  ): ModuleWithProviders<DrawerModule> {
    return {
      ngModule: DrawerModule,
      providers: [
        {
          provide: DrawerEntriesProvider,
          useValue: drawerEntries,
        },
        {
          provide: DrawerKeysProvider,
          useValue: getDrawerKeys(drawerEntries),
        },
        {
          provide: DrawerOutletContainerProvider,
          useValue: customContainer,
        },
      ],
    };
  }
}

export function getDrawerKeys(entries: DrawerEntry[]): string[] {
  const keys = entries.map(e => e.key);
  return keys;
}
