import {Component, OnInit} from "@angular/core";
import {Post} from "../models/post.model";
import {
    ToastController,
    LoadingController,
    NavController
} from "@ionic/angular";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
    selector: "app-add-post",
    templateUrl: "./add-post.page.html",
    styleUrls: ["./add-post.page.scss"]
})
export class AddPostPage implements OnInit {
    post = {} as Post;

    constructor(
        private toastCtrl: ToastController,
        private loadingCtrl: LoadingController,
        private afAuth: AngularFireAuth,
        private firestore: AngularFirestore,
        private navCtrl: NavController
    ) {
    }

    ngOnInit() {
    }

    async createPost(post: Post) {
        // console.log(post);

        if (this.formValidation()) {
            let loader = await this.loadingCtrl.create({
                message: "Espere"
            });
            loader.present();

            try {
                await this.firestore.collection("posts").add(post);
            } catch (e) {
                this.showToast(e);
            }

            // dismiss loader
            loader.dismiss();

            // redirect to home page
            this.navCtrl.navigateRoot("home");
        }
    }

    formValidation() {
        if (!this.post.model) {

            this.showToast("Ingresa Modelo");
            return false;
        }

        if (!this.post.color) {

            this.showToast("Ingresa Modelo");
            return false;
        }

        if (!this.post.service) {

            this.showToast("Ingresa Servicio");
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
