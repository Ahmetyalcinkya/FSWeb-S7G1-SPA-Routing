import React, { useState, useEffect } from "react";
import axios from "axios";
import FilmListesi from "./Filmler/FilmListesi";
import Film from "./Filmler/Film";
import KaydedilenlerListesi from "./Filmler/KaydedilenlerListesi";
import { Switch, Route } from "react-router-dom";

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get("http://localhost:5001/api/filmler") // Burayı Postman'le çalışın
        .then((response) => {
          // Bu kısmı log statementlarıyla çalışın
          //todo console.log(response.data);
          // ve burdan gelen response'u 'movieList' e aktarın
          setMovieList(response.data);
        })
        .catch((error) => {
          console.error("Sunucu Hatası", error);
        });
    };
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = (movie) => {
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
    const savedMovie = [];
    savedMovie.find((item) =>
      item.id === movie.id ? null : savedMovie.push(movie)
    );
    setSaved([...savedMovie]);
  };

  return (
    <div>
      <KaydedilenlerListesi list={[saved]} />

      <Switch>
        <Route path="/" exact>
          <FilmListesi movieList={movieList} />
        </Route>
        <Route path="/filmler/" exact>
          <Film KaydedilenlerListesineEkle={KaydedilenlerListesineEkle} />
        </Route>
      </Switch>
    </div>
  );
}
