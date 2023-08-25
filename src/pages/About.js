import React from "react";
import BannerImage from "../assets/about.webp";
import "../styles/About.css";

function About() {
  return (
    <div className="about">
      <div
        className="aboutImage"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${BannerImage})`,
        }}
      >
        <h1 className="aboutTitle">ABOUT US</h1>
        <p className="aboutText">Discover our expertise</p>
      </div>
      <div className="aboutBottom">
        <h1>We serve all your material needs</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a
          dui in diam varius sollicitudin. Donec pretium leo id nisl finibus
          suscipit. Nulla mollis laoreet laoreet. Donec id nisl ut purus dapibus
          posuere. Aliquam eu erat in metus aliquet hendrerit at eget nunc.
          Morbi a rutrum magna. Nullam molestie mauris turpis. Etiam consectetur
          condimentum risus ut lobortis. Curabitur faucibus imperdiet erat, sit
          amet sollicitudin ligula volutpat quis. Praesent pulvinar tellus nibh,
          ut consectetur augue tincidunt eu. Nam eros metus, vestibulum eget
          erat nec, volutpat ullamcorper lorem. Aliquam ornare nec nunc quis
          aliquam. Mauris efficitur erat ac turpis imperdiet, in aliquet quam
          feugiat. Duis luctus ex lectus, nec vulputate ligula ornare a. Integer
          in fringilla augue. Nulla facilisi. Nullam dapibus mi quis quam
          pretium, vel laoreet lacus pulvinar. Suspendisse semper commodo ante,
          a hendrerit dui pulvinar sit amet. Pellentesque ultricies fringilla
          libero, et luctus nisl lacinia eget. Pellentesque consequat hendrerit
          lacus vel cursus. Curabitur mattis, mauris sed feugiat euismod, tortor
          felis laoreet dolor, ac faucibus nisi ligula ut odio. Fusce pharetra
          dui ex, sit amet congue nisl volutpat sit amet. Donec consectetur odio
          sed pharetra posuere. Aliquam ac pharetra velit, id mattis est. Nunc
          sollicitudin, velit eget pharetra ullamcorper, lectus ipsum posuere
          odio, eu ullamcorper sem nisl sit amet urna. Quisque quis scelerisque
          nulla. Donec venenatis urna sit amet gravida tincidunt. Proin et
          turpis eu massa euismod accumsan. Sed vitae quam lacus. Ut ex dolor,
          varius eget rhoncus at, placerat quis libero. Nullam efficitur massa
          sed tincidunt fermentum. Proin aliquet nulla nisl, vitae facilisis
          metus ultrices vitae. Nam porta ornare ligula. Integer nulla tellus,
          pharetra id aliquam ac, fringilla a sapien. Suspendisse laoreet a
          nulla in posuere. Vestibulum porta urna nec eros faucibus dignissim.
          Phasellus maximus tincidunt arcu, a volutpat massa congue in. Praesent
          in urna sodales, convallis augue in, ullamcorper dui. Sed sollicitudin
          pretium scelerisque. Nam mi justo, finibus ac libero nec, iaculis
          aliquet ex. Donec vestibulum viverra hendrerit. Vivamus interdum est
          vitae sagittis porttitor. Proin consectetur at felis sed suscipit.
          Orci varius natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus. Aliquam nisi odio, molestie a auctor et,
          efficitur sed mauris. In sit amet eros quis ipsum auctor tristique eu
          elementum neque. Praesent malesuada velit at nunc blandit, sed maximus
          augue molestie. Donec dui dui, dapibus a nisi at, mollis sagittis mi.
          Cras et purus metus.
        </p>
        <h1>Why choose us?</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a
          dui in diam varius sollicitudin. Donec pretium leo id nisl finibus
          suscipit. Nulla mollis laoreet laoreet. Donec id nisl ut purus dapibus
          posuere. Aliquam eu erat in metus aliquet hendrerit at eget nunc.
          Morbi a rutrum magna. Nullam molestie mauris turpis. Etiam consectetur
          condimentum risus ut lobortis. Curabitur faucibus imperdiet erat, sit
          amet sollicitudin ligula volutpat quis. Praesent pulvinar tellus nibh,
          ut consectetur augue tincidunt eu. Nam eros metus, vestibulum eget
          erat nec, volutpat ullamcorper lorem. Aliquam ornare nec nunc quis
          aliquam. Mauris efficitur erat ac turpis imperdiet, in aliquet quam
          feugiat. Duis luctus ex lectus, nec vulputate ligula ornare a. Integer
          in fringilla augue. Nulla facilisi. Nullam dapibus mi quis quam
          pretium, vel laoreet lacus pulvinar. Suspendisse semper commodo ante,
          a hendrerit dui pulvinar sit amet. Pellentesque ultricies fringilla
          libero, et luctus nisl lacinia eget. Pellentesque consequat hendrerit
          lacus vel cursus. Curabitur mattis, mauris sed feugiat euismod, tortor
          felis laoreet dolor, ac faucibus nisi ligula ut odio. Fusce pharetra
          dui ex, sit amet congue nisl volutpat sit amet. Donec consectetur odio
          sed pharetra posuere. Aliquam ac pharetra velit, id mattis est. Nunc
          sollicitudin, velit eget pharetra ullamcorper, lectus ipsum posuere
          odio, eu ullamcorper sem nisl sit amet urna. Quisque quis scelerisque
          nulla. Donec venenatis urna sit amet gravida tincidunt. Proin et
          turpis eu massa euismod accumsan. Sed vitae quam lacus. Ut ex dolor,
          varius eget rhoncus at, placerat quis libero. Nullam efficitur massa
          sed tincidunt fermentum. Proin aliquet nulla nisl, vitae facilisis
          metus ultrices vitae. Nam porta ornare ligula. Integer nulla tellus,
          pharetra id aliquam ac, fringilla a sapien. Suspendisse laoreet a
          nulla in posuere. Vestibulum porta urna nec eros faucibus dignissim.
          Phasellus maximus tincidunt arcu, a volutpat massa congue in. Praesent
          in urna sodales, convallis augue in, ullamcorper dui. Sed sollicitudin
          pretium scelerisque. Nam mi justo, finibus ac libero nec, iaculis
          aliquet ex. Donec vestibulum viverra hendrerit. Vivamus interdum est
          vitae sagittis porttitor. Proin consectetur at felis sed suscipit.
          Orci varius natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus. Aliquam nisi odio, molestie a auctor et,
          efficitur sed mauris. In sit amet eros quis ipsum auctor tristique eu
          elementum neque. Praesent malesuada velit at nunc blandit, sed maximus
          augue molestie. Donec dui dui, dapibus a nisi at, mollis sagittis mi.
          Cras et purus metus.
        </p>
      </div>
    </div>
  );
}

export default About;
