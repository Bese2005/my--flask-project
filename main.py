from flask import Flask, render_template

app = Flask(__name__)


# 1.Front page (hjemmeside)
@app.route("/")
def home():
    return render_template("index.html")

# 2.About me page (om meg)

@app.route("/om_meg")
def om_meg():
    return render_template("about.html")


#. 3 Project page
@app.route("/prosjekt")
def prosjekt():
    return render_template("project.html")


#. 4 Contact page 

@app.route("/kontakt")
def kontakt():
    return render_template("contact.html")

# 5 Variabel page

@app.route("/variabel")
def variabel():
    elev =["Besse", "Mosise", "Fatima", "Karl"]
    return render_template("variabel.html", elev=elev)


if __name__ == "__main__" :
    app.run(host="0.0.0.0", port=8080, debug=True)