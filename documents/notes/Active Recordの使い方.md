# Active Recordの使い方

Prismaと同じくORMなのだが、結構使い方は違いそう。

## マイグレーションとRails上での操作

チュートリアルでは次のような順序で説明されている。

1. `bin/rails generate model <ModelName> member:type` を実行してマイグレーション、モデルファイルを作成
2. `bin/rails db:migrate` を実行してマイグレーションファイルからテーブルの実体を作る
3. モデルを通じてレコードに対応するインスタンスの作成や操作を行う

これらの手順の実際の関係性は下図のようになっている。

1. モデル生成
┣━ 2. テーブル作成
┗━ 3. (モデルファイル自動作成->)モデル操作

そのため、モデルファイルを変更したからといって、それに合わせてテーブルが変化するわけではない。モデルファイルの変更がカラムの属性などに関わるものであればさらにマイグレーションを行い、テーブルの方もそちらの仕様に合わせる必要がある？

## 多対多リレーション

Prismaは`tags Tag[] @relation(ObjectTags)`という感じで多対多の関係を配列的に表現できるようだが、Active Recordでは明示的に中間テーブルを作らなければならないようだ。

## 関連付け

モデル同士の関連付けをするとき、has_manyやbelongs_toといったキーワードがある。これらはどう動作するのだろうか。

参照: https://railsguides.jp/association_basics.html
コードもこのリンクから抜粋。

### 概要

モデルのインスタンス同士の主キーや外部キーの管理を支援してくれる機能。データの整合性をデータベースに保たせるための属性づけとなる。
これらはマイグレーションファイルではなくモデルファイルに記述するもののようだ。(マイグレーションではあくまでカラムの型と名前だけを扱い、カラムの属性はモデルファイルで扱う？)

### もしなかったら？

create(INSERT文に対応)でIDの対応を明示的に指定する羽目になるほか、なにより削除時にそのレコードに付随する他テーブルのデータをすべて削除するという処理を組み込まなければならなくなる。

```
// マイグレーションファイル
class CreateAuthors < ActiveRecord::Migration[8.0]
  def change
    create_table :authors do |t|
      t.string :name
      t.timestamps
    end

    create_table :books do |t|
      t.references :author
      t.datetime :published_at
      t.timestamps
    end
  end
end
```

```
// モデルファイル
class Author < ApplicationRecord
end

class Book < ApplicationRecord
end
```

```
// create
@book = Book.create(author_id: @author.id, published_at: Time.now)

// destroy
@books = Book.where(author_id: @author.id)
@books.each do |book|
  book.destroy
end
@author.destroy
```

### あったら？

```
// モデルファイル
class Author < ApplicationRecord
  has_many :books, dependent: :destroy
end

class Book < ApplicationRecord
  belongs_to :author
end
```

のように、モデルファイルに一対多対応を表す`has_many`、外部キーを表す`belongs_to`を追記する。すると、createやdestroyが簡単に記述できるようになる。

```
// create
@book = @author.books.create(published_at: Time.now)

// destroy
@auther.destroy
```

ただし、これだけではテーブルに変更が適用されないので
`rails generate migration AddAuthorToBooks auther: references`
といった、外部キー制約を内部でつけさせるためのマイグレーションを行う必要がある。

### 各種関連付けの特徴

1. belongs_to
    - 子→親の参照のみを持つ(指定したモデルのテーブルに外部キー)
2. has_one
    - 親→子の参照のみを持つ(親テーブルに外部キー)
    - 相手もbelongs_toを持つと双方向関連付けになる
3. has_many
    - has_oneの非unique
    - 相手モデルを複数形で指定
4. has_many :through
    - 中間テーブルを経由(through)して多数を持つ
    - 性質上多対多のリレーションでよく使われる
5. has_one :through
    - 中間テーブルを経由(through)して一つを持つ？
6. has_and_belongs_to_many
    - 中間テーブルなしで多対多？
