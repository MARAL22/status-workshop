import {Component, OnInit} from "@angular/core";
import {User} from "../models/user.model";
import {
    ToastController,
    LoadingController,
    NavController,
    Platform
} from "@ionic/angular";
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
    selector: "app-login",
    templateUrl: "./login.page.html",
    styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
    user = {} as User;
    subscription: any;

    constructor(
        private toastCtrl: ToastController,
        private loadingCtrl: LoadingController,
        private afAuth: AngularFireAuth,
        private navCtrl: NavController,
        private platform: Platform
    ) {
    }

    ngOnInit() {
    }

    ionViewWillLeave() {
        this.subscription.unsubscribe();
    }

    ionViewDidEnter() {
        this.subscription = this.platform.backButton.subscribe(() => {
            navigator["app"].exitApp();
        });
    }

    async login(user: User) {
        // console.log(user);

        if (this.formValidation()) {

            // Carga de página
            let loader = await this.loadingCtrl.create({
                message: "Espere un momento"
            });
            loader.present();

            try {
                // usamos el metodo de logeo de google
                await this.afAuth.auth
                    .signInWithEmailAndPassword(user.email, user.password)
                    .then(data => {
                        console.log(data);

                        // Redirigimos a home
                        this.navCtrl.navigateRoot("home");
                    })
                    .catch();
            } catch (e) {
                this.showToast(e);
            }

            loader.dismiss();
        }
    }

    formValidation() {
        if (!this.user.email) {
            // show toast message
            this.showToast("Ingresa correo");
            return false;
        }

        if (!this.user.password) {
            // show toast message
            this.showToast("Ingresa contraseña");
            return false;
        }

        return true;
    }

    showToast(message: string) {
        this.toastCtrl
            .create({
                message: message,
                duration: 3000
            })
            .then(toastData => toastData.present());
    }
}
