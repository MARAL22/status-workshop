import {Component} from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";
import {ToastController, LoadingController, Platform} from "@ionic/angular";

@Component({
    selector: "app-home",
    templateUrl: "home.page.html",
    styleUrls: ["home.page.scss"]
})
export class HomePage {
    posts: any;
    subscription: any;

    constructor(
        private toastCtrl: ToastController,
        private firestore: AngularFirestore,
        private loadingCtrl: LoadingController,
        private platform: Platform
    ) {
    }

    ionViewDidEnter() {
        this.subscription = this.platform.backButton.subscribe(() => {
            navigator["app"].exitApp();
        });
    }

    ionViewWillLeave() {
        this.subscription.unsubscribe();
    }

    async getPosts() {

        let loader = await this.loadingCtrl.create({
            message: "Please wait..."
        });
        loader.present();

        try {
            this.firestore
                .collection("posts")
                .snapshotChanges()
                .subscribe(data => {
                    this.posts = data.map(e => {
                        return {
                            id: e.payload.doc.id,
                            model: e.payload.doc.data()["model"],
                            color: e.payload.doc.data()["color"],
                            service: e.payload.doc.data()["service"]
                        };
                    });
                    loader.dismiss();
                });
        } catch (e) {
            this.showToast(e);
        }
    }

    async deletePost(id: string) {

        let loader = await this.loadingCtrl.create({
            message: "Espere un momento"
        });
        loader.present();

        await this.firestore.doc("posts/" + id).delete();

        loader.dismiss();
    }

    ionViewWillEnter() {
        this.getPosts();
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
