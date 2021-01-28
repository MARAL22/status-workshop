import {Component, OnInit} from "@angular/core";
import {User} from "../models/user.model";
import {
    ToastController,
    LoadingController,
    NavController
} from "@ionic/angular";
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
    selector: "app-register",
    templateUrl: "./register.page.html",
    styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
    user = {} as User;

    constructor(
        private toastCtrl: ToastController,
        private loadingCtrl: LoadingController,
        private afAuth: AngularFireAuth,
        private navCtrl: NavController
    ) {
    }

    ngOnInit() {
    }

    async register(user: User) {
        // console.log(user);

        if (this.formValidation()) {
            // console.log("ready to submit");

            // mostramos un pequeño loader screen
            let loader = await this.loadingCtrl.create({
                message: "Espere un momento"
            });
            loader.present();

            try {
                // vamos a registrar al usuario
                await this.afAuth.auth
                    .createUserWithEmailAndPassword(user.email, user.password)
                    .then(data => {
                        console.log(data);

                        // redirigimos a inicio
                        this.navCtrl.navigateRoot("home");
                    })
                    .catch();
            } catch (e) {
                this.showToast(e);
            }

            // quitamos el loader ya que el usuario fue redirigido a home
            loader.dismiss();
        }
    }

    formValidation() {
        if (!this.user.email) {
            this.showToast("Ingresa correo");
            return false;
        }

        if (!this.user.password) {
            this.showToast("Ingresa tu contraseña");
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
