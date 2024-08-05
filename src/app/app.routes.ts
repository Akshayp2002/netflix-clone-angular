import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { PreviewComponent } from './pages/preview/preview.component';

export const routes: Routes = [
    {
        path:'',
        component: LoginComponent
    },
    {
        path: 'browse',
        component: BrowseComponent
    },
    {
        path: 'preview/:id',
        component: PreviewComponent
    },
];
