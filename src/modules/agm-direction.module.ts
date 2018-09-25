import { NgModule, ModuleWithProviders } from '@angular/core';
import { AgmDirection } from '../directive/agm-direction.directive';
import { HttpClientModule } from '@angular/common/http';

export * from '../directive/agm-direction.directive';

@NgModule({
    imports: [
        HttpClientModule,
    ],
    declarations: [
        AgmDirection,
    ],
    exports: [
        AgmDirection,
    ]
})
export class AgmDirectionModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AgmDirectionModule,
        };
    }
}
